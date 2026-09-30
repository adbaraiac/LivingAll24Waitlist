// Waitlist signup handler.
//
// Runtime: Node.js 20.x (AWS SDK v3 is preinstalled in the Lambda runtime).
// Trigger: API Gateway HTTP API (POST /waitlist).
//
// Responsibilities:
//   1. Validate the incoming email.
//   2. Store the signup in DynamoDB (idempotent — duplicate emails return 409).
//   3. Email you a notification via SES so you see signups in real time.
//
// Configuration comes entirely from environment variables (set by the SAM
// template). Nothing is hardcoded.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const TABLE = process.env.TABLE_NAME;
const NOTIFY_TO = process.env.NOTIFY_EMAIL; // where signup alerts are sent
const NOTIFY_FROM = process.env.SENDER_EMAIL || process.env.NOTIFY_EMAIL; // verified SES identity
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function response(statusCode, body) {
  return { statusCode, headers: corsHeaders, body: JSON.stringify(body) };
}

function str(v, max = 512) {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

export const handler = async (event) => {
  // CORS preflight (also handled at the API Gateway level as a safety net).
  const method =
    event?.requestContext?.http?.method || event?.httpMethod || "POST";
  if (method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return response(400, { error: "Invalid JSON body." });
  }

  const email = (str(data.email) || "").toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return response(400, { error: "Invalid email address." });
  }

  const now = new Date().toISOString();

  const item = {
    email, // partition key
    createdAt: str(data.timestamp) || now,
    receivedAt: now,
    referral: str(data.referral),
    utm_source: str(data.utm_source),
    utm_medium: str(data.utm_medium),
    utm_campaign: str(data.utm_campaign),
    utm_content: str(data.utm_content),
    utm_term: str(data.utm_term),
    landing_page: str(data.landing_page, 1024),
    referrer: str(data.referrer, 1024),
    userAgent: str(event?.headers?.["user-agent"], 512),
  };

  // 1. Store — conditional put means a repeat email is rejected as duplicate.
  try {
    await ddb.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: "attribute_not_exists(email)",
      })
    );
  } catch (err) {
    if (err?.name === "ConditionalCheckFailedException") {
      return response(409, { ok: true, duplicate: true });
    }
    console.error("DynamoDB error:", err);
    return response(500, { error: "Could not save signup." });
  }

  // 2. Notify — never fail the signup if the email notification fails.
  if (NOTIFY_TO && NOTIFY_FROM) {
    try {
      const source = attributionSummary(item);
      await ses.send(
        new SendEmailCommand({
          Source: NOTIFY_FROM,
          Destination: { ToAddresses: [NOTIFY_TO] },
          Message: {
            Subject: { Data: `New waitlist signup: ${email}` },
            Body: {
              Text: {
                Data: [
                  `New signup for the waitlist 🎉`,
                  ``,
                  `Email:     ${email}`,
                  `Time:      ${item.createdAt}`,
                  `Source:    ${source}`,
                  `Landing:   ${item.landing_page || "—"}`,
                  `Referrer:  ${item.referrer || "—"}`,
                ].join("\n"),
              },
            },
          },
        })
      );
    } catch (err) {
      console.error("SES notify error (signup still saved):", err);
    }
  }

  return response(200, { ok: true });
};

function attributionSummary(item) {
  const parts = [];
  if (item.referral) parts.push(`ref=${item.referral}`);
  if (item.utm_source) parts.push(`utm_source=${item.utm_source}`);
  if (item.utm_medium) parts.push(`utm_medium=${item.utm_medium}`);
  if (item.utm_campaign) parts.push(`utm_campaign=${item.utm_campaign}`);
  if (item.utm_content) parts.push(`utm_content=${item.utm_content}`);
  if (item.utm_term) parts.push(`utm_term=${item.utm_term}`);
  return parts.length ? parts.join("  ") : "direct / unknown";
}
