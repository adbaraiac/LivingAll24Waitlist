# Deployment guide

Two parts:

1. **AWS backend** — stores signups and emails you when someone joins.
2. **GitHub Pages** — hosts the website for free.

Do the AWS part first, because you need its URL for the website config.

---

## Part 1 — AWS backend (email notifications + storage)

This creates: a DynamoDB table (stores emails), a Lambda function (handles
signups), an API Gateway URL (what the website calls), and an SNS topic that
emails you each signup. Cost at waitlist volume is effectively **$0** (all
within AWS free tier / pay-per-request).

### 1.1 Install the tools (one time)

- [AWS account](https://aws.amazon.com/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) →
  then run `aws configure` and paste an access key from
  IAM → Users → your user → Security credentials.
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

Verify:

```bash
aws sts get-caller-identity
sam --version
```

### 1.2 Deploy

From the `aws/` folder:

```bash
cd aws
sam build
sam deploy --guided
```

Answer the prompts:

- **Stack Name:** any name you like (e.g. `my-waitlist`)
- **AWS Region:** e.g. `us-east-1`
- **Parameter NotifyEmail:** the email that should get signup alerts
- **Parameter AllowedOrigin:** `*` for now (tighten later — see 3.2)
- Allow SAM to create roles: **Y**
- Save arguments to config file: **Y**

When it finishes it prints an **Outputs** section. Copy the
**`WaitlistEndpoint`** value — a URL like:

```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/waitlist
```

That's your backend. Re-deploys later are just `sam build && sam deploy`.

**Confirm the alert subscription:** the first deploy makes AWS send an email
titled "AWS Notification - Subscription Confirmation" to `NotifyEmail`. Click
**Confirm subscription** in it. No alerts are sent until you do.

> Why SNS and not SES? SES would send alerts "from" your own address. For a
> gmail.com address, Gmail sees mail claiming to be from gmail.com that Google
> didn't send and files it as spam. SNS alerts come from AWS's own
> authenticated domain, so they reach the inbox without you owning a domain.

### 1.3 Test it

```bash
curl -X POST https://abc123xyz.execute-api.us-east-1.amazonaws.com/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","timestamp":"2026-01-01T00:00:00Z","utm_source":"test"}'
```

You should get `{"ok":true}` and an email within a minute. Signups appear in
DynamoDB → Tables → `<stack-name>-signups` → Explore items.

> **Heads-up:** every alert email has an "unsubscribe" link at the bottom.
> Clicking it stops all alerts. If that happens, re-run the deploy and confirm
> the new subscription email.

---

## Part 2 — Host on GitHub Pages

### 2.1 Push the code to GitHub

Create a new repo on GitHub (e.g. `<repo-name>`), then from this folder:

```bash
git init
git add .
git commit -m "LivingAll24 waitlist landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 2.2 Add the site config as repo Variables

In the repo: **Settings → Secrets and variables → Actions → Variables tab →
New repository variable**. Add one:

| Name                | Value                                    |
| ------------------- | ---------------------------------------- |
| `WAITLIST_ENDPOINT` | the `WaitlistEndpoint` URL from step 1.2 |

> The base path is set automatically to `/<repo-name>`, because GitHub serves
> the site at `https://<username>.github.io/<repo-name>/`. If you later move to
> a custom domain served from the root, add a `BASE_PATH` variable set to `/`.

### 2.3 Turn on Pages

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

That's it. The workflow in `.github/workflows/deploy.yml` builds and deploys on
every push to `main`. Watch it under the **Actions** tab; when it's green your
site is live at `https://<username>.github.io/<repo-name>/`.

### 2.4 Re-deploys

Just push to `main`. To trigger a deploy without a code change, use the
**Actions** tab → *Deploy to GitHub Pages* → **Run workflow**.

---

## Part 3 — After it's live

### 3.1 Share previews

Nothing to do on GitHub Pages: the workflow sets the site URL to
`https://<username>.github.io/<repo-name>` so link previews (iMessage, TikTok,
X, etc.) load `og.png` from the right place. If you edit `public/og.svg` or
`public/favicon.svg`, run `npm run images` to regenerate the PNG versions.

### 3.2 Lock down CORS (recommended)

Right now the API accepts requests from anywhere (`*`). Once you know your site
URL, restrict it:

```bash
cd aws
sam deploy --parameter-overrides \
  NotifyEmail=you@example.com \
  AllowedOrigin=https://<username>.github.io
```

### 3.3 Tracking links for your content

Add parameters to the link in your TikTok/Reels/Shorts bio so you know what
converts:

```
https://<username>.github.io/<repo-name>/?ref=gym_hook_v2&utm_source=tiktok
```

These land in the notification email and DynamoDB with each signup.

---

## Custom domain (optional, later)

1. Buy a domain (Namecheap, Cloudflare, Google Domains, etc.).
2. Repo **Settings → Pages → Custom domain** → enter it → follow the DNS steps.
3. Add a `BASE_PATH` repo variable set to `/` (root domains don't use a
   sub-path) and re-run the deploy.
4. Add a `SITE_URL` repo variable set to `https://yourdomain.com`, and update
   `AllowedOrigin` (step 3.2) to the new domain.

---

## Troubleshooting

- **No alert email arrives:** the SNS subscription isn't confirmed (SNS console
  → Subscriptions → status must be "Confirmed", not "PendingConfirmation"), or
  you clicked an alert's unsubscribe link. Check the function's CloudWatch logs
  for "Notification published" (sent) or "SNS notify error".
- **Form says "Something went wrong":** `WAITLIST_ENDPOINT` variable is wrong or
  CORS `AllowedOrigin` doesn't match your site origin. Check the browser console.
- **Site 404s / no styles:** the base path doesn't match where the site is
  served. On `<username>.github.io/<repo>/` leave `BASE_PATH` unset; on a custom
  domain set it to `/`.
- **Build fails in Actions:** open the failed run under the Actions tab; it's
  almost always a missing/typo'd repo Variable.
