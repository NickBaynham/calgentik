# Deployment overview

This document ties together hosting options, DNS, TLS, and GitHub ↔ AWS authentication for the [calgentik](https://github.com/NickBaynham/calgentik) website.

## Repository roles

| Repository | Purpose |
|------------|---------|
| [NickBaynham/calgentik](https://github.com/NickBaynham/calgentik) | Marketing and documentation site (this repo). Serves **calgentik.com**. |
| [NickBaynham/verifiedsignal](https://github.com/NickBaynham/verifiedsignal) | Application and backend for **verifiedsignal.io**. |

## Recommended architecture

**GitHub → AWS Amplify Hosting → calgentik.com**

- Full Next.js App Router, MDX, and future SSR/API routes without retooling.
- Managed builds, previews, and HTTPS via ACM.
- Connect the GitHub repo in the Amplify console; use `amplify.yml` at the repo root.

Details: [aws-amplify.md](./aws-amplify.md).

## Alternative architecture

**GitHub Actions → S3 → CloudFront → Route 53 → calgentik.com**

- Suitable only when the site is a **static export** (`output: 'export'` in `next.config.ts`).
- Use OIDC to assume an IAM role in Actions—no long-lived access keys.

Details: [aws-s3-cloudfront.md](./aws-s3-cloudfront.md). Example workflow: `.github/workflows/deploy-static-example.yml`.

## Branch model

| Branch | Purpose |
|--------|---------|
| Feature branches | Development; optional PR previews (Amplify) or CI only. |
| `develop` | Staging environment (Amplify branch or separate app). |
| `main` | Production (`calgentik.com`). |

## GitHub OIDC with AWS (for Actions → S3/CloudFront)

OIDC lets GitHub Actions request **short-lived** credentials from AWS. You do **not** store `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` in GitHub.

### Why OIDC

- No static keys to rotate or leak.
- Scoped trust: only specified repos/branches/environments can assume the role.
- Auditable via CloudTrail.

### 1. Create an IAM identity provider for GitHub

In **IAM → Identity providers → Add provider**:

- Provider type: **OpenID Connect**
- Provider URL: `https://token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`

### 2. Create an IAM role (trust policy)

**Example trust policy** (replace `<aws-account-id>` and tune `sub` / `ref` as needed). This allows the **NickBaynham/calgentik** repo to assume the role from GitHub Actions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "GitHubActionsCalgentik",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<aws-account-id>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:NickBaynham/calgentik:*"
        }
      }
    }
  ]
}
```

Tighten `sub` for production, for example:

- `repo:NickBaynham/calgentik:ref:refs/heads/main`
- Or use a GitHub **Environment** and `sub` patterns that include the environment claim.

### 3. Attach a permissions policy to `<role-name>`

Use least privilege. **Examples only**—adjust bucket and distribution ARNs.

**S3 deploy (example):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SyncMarketingSite",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::<your-bucket-name>",
        "arn:aws:s3:::<your-bucket-name>/*"
      ]
    }
  ]
}
```

**CloudFront invalidation (example):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "InvalidateDistribution",
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::<aws-account-id>:distribution/<distribution-id>"
    }
  ]
}
```

### 4. Configure GitHub

Repository **Settings → Secrets and variables → Actions → Variables** (for the example deploy workflow):

| Variable | Example / note |
|----------|----------------|
| `AWS_ROLE_TO_ASSUME` | `arn:aws:iam::<aws-account-id>:role/<role-name>` |
| `AWS_REGION` | `us-east-1` |
| `S3_BUCKET` | Your bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | Optional; omit to skip invalidation |
| `NEXT_PUBLIC_SITE_URL` | Optional override for build |

Never commit AWS credentials to the repository.

## Production checklist

- [ ] **DNS:** `calgentik.com` (and `www` if used) points to Amplify or CloudFront as required by the chosen product.
- [ ] **TLS:** Certificate in **ACM** in the correct region (us-east-1 for CloudFront; Amplify manages ACM for its front door).
- [ ] **Environment variables:** Set `NEXT_PUBLIC_*` in Amplify console or GitHub Variables as needed (see `.env.example`). For the **Contact** form (`/api/contact`), also set server-only **`RESEND_API_KEY`**, **`CONTACT_INBOX_EMAIL`**, and optionally **`RESEND_FROM_EMAIL`** in Amplify, then redeploy—see [Contact form email](./aws-amplify.md#contact-form-email) in `aws-amplify.md`.
- [ ] **Build:** CI green (`lint`, `typecheck`, `build`); run a local `npm run build` before release.
- [ ] **Cache:** CloudFront or Amplify caching tuned; after S3 deploy, invalidate or wait for TTL.
- [ ] **Smoke test:** Load `/`, `/documentation`, `/resources`; verify links to **verifiedsignal.io**.

## Related files

- CI: `.github/workflows/ci.yml`
- Static deploy example: `.github/workflows/deploy-static-example.yml`
- Amplify build spec: `amplify.yml`
- Env template: `.env.example`
- OIDC overview: [github-oidc.md](./github-oidc.md)
