# Deployment guide

Two parts:

1. **AWS backend** — stores signups and emails you when someone joins.
2. **GitHub Pages** — hosts the website for free.

Do the AWS part first, because you need its URL for the website config.

---

## Part 1 — AWS backend (email notifications + storage)

This creates: a DynamoDB table (stores emails), a Lambda function (handles
signups), and an API Gateway URL (what the website calls). Cost at waitlist
volume is effectively **$0** (all within AWS free tier / pay-per-request).

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

### 1.2 Verify your email with SES (so it can email you)

SES starts in "sandbox" mode, which is fine for notifications to yourself —
you just have to verify the address first.

1. Open the [SES console](https://console.aws.amazon.com/ses/) → pick a region
   near you (e.g. **us-east-1**). Remember this region.
2. **Verified identities → Create identity → Email address** → enter your email
   (e.g. `you@example.com`) → check your inbox → click the verify link.

That address will be both the sender and the recipient of signup alerts.

### 1.3 Deploy

From the `aws/` folder:

```bash
cd aws
sam build
sam deploy --guided
```

Answer the prompts:

- **Stack Name:** any name you like (e.g. `my-waitlist`)
- **AWS Region:** the same region you verified SES in (e.g. `us-east-1`)
- **Parameter NotifyEmail:** your verified email
- **Parameter SenderEmail:** leave blank (uses NotifyEmail)
- **Parameter AllowedOrigin:** `*` for now (tighten later — see 3.2)
- Allow SAM to create roles: **Y**
- Save arguments to config file: **Y**

When it finishes it prints an **Outputs** section. Copy the
**`WaitlistEndpoint`** value — a URL like:

```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/waitlist
```

That's your backend. Re-deploys later are just `sam build && sam deploy`.

### 1.4 Test it

```bash
curl -X POST https://abc123xyz.execute-api.us-east-1.amazonaws.com/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","timestamp":"2026-01-01T00:00:00Z","utm_source":"test"}'
```

You should get `{"ok":true}` and an email within a minute. Signups appear in
DynamoDB → Tables → `<stack-name>-signups` → Explore items.

> **When you're ready for real traffic:** if you ever want to email *signups*
> (not just yourself), request SES production access (SES console → Account
> dashboard → Request production access). For just notifying yourself, sandbox
> mode is fine.

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
| `WAITLIST_ENDPOINT` | the `WaitlistEndpoint` URL from step 1.3 |

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

- **No email arrives:** the address isn't SES-verified, or you're emailing an
  address other than the verified one while in the SES sandbox. Verify it.
- **Form says "Something went wrong":** `WAITLIST_ENDPOINT` variable is wrong or
  CORS `AllowedOrigin` doesn't match your site origin. Check the browser console.
- **Site 404s / no styles:** the base path doesn't match where the site is
  served. On `<username>.github.io/<repo>/` leave `BASE_PATH` unset; on a custom
  domain set it to `/`.
- **Build fails in Actions:** open the failed run under the Actions tab; it's
  almost always a missing/typo'd repo Variable.
