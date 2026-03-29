# AWS Amplify Hosting (preferred)

Amplify is the recommended way to host this Next.js marketing and documentation site: it supports the **full Next.js runtime** (no static export required) and integrates directly with GitHub.

## Connect GitHub to Amplify

1. Open the [AWS Amplify console](https://console.aws.amazon.com/amplify/).
2. **Create new app** → **Host web app**.
3. Choose **GitHub**, authorize AWS, and select repository **NickBaynham/calgentik**.
4. Pick branches to connect:
   - **Production:** `main` → custom domain **calgentik.com**.
   - **Staging:** `develop` (add as a second branch in the same app, or a separate Amplify app).
5. Amplify detects **Next.js**; confirm build settings point at `amplify.yml` in the repo root.

## Build specification

The repo includes [`amplify.yml`](../amplify.yml):

- `npm ci` in `preBuild`
- `npm run build` in `build`
- Caches `node_modules` and `.next/cache`

### Artifacts (`baseDirectory`)

- Default in `amplify.yml` is **`.next`**, which matches common Amplify Next.js SSR/static hybrid hosting.
- If you switch the project to **static export** (`output: 'export'`), change `artifacts.baseDirectory` to **`out`** and align Amplify’s “output directory” with your console settings.

If the first build fails, use the Amplify console **Build settings** editor to match AWS’s latest Next.js template, then sync changes back into `amplify.yml`.

## Branch and preview model

| Branch | Suggested use |
|--------|----------------|
| `main` | Production; attach **calgentik.com** in **Domain management**. |
| `develop` | Staging (e.g. `staging.calgentik.com` or Amplify branch URL). |
| Feature / PR | Enable **Pull request previews** in Amplify for ephemeral preview URLs. |

## Domain and HTTPS

1. In Amplify: **Hosting → Custom domains** → add `calgentik.com` and `www.calgentik.com` if needed.
2. Follow the console to validate domain ownership (DNS CNAME or Route 53).
3. Amplify provisions **ACM** certificates for the Amplify-managed distribution.

## Environment variables

In Amplify: **App settings → Environment variables**.

Set the same `NEXT_PUBLIC_*` keys as in [`.env.example`](../.env.example) for production (and per-branch overrides for staging if needed). To serve large **Resources** files from S3/CloudFront, set **`NEXT_PUBLIC_MEDIA_BASE_URL`** (and optionally **`NEXT_PUBLIC_DEMO_VIDEO_URL`** for a custom demo URL). See [S3 + CloudFront – Resources media](./aws-s3-cloudfront.md#hosting-resources-media-s3--cloudfront).

If **`public/resources/`** is empty in Git, set **both** of these in Amplify to the **same** S3 (or CloudFront) HTTPS origin — **no trailing slash**, and **no path prefix** if objects live at the bucket root (e.g. `https://calgentik-media.s3.us-east-1.amazonaws.com`):

- **`NEXT_PUBLIC_MEDIA_BASE_URL`** — **required** for **Edge Middleware** (`middleware.ts`) so `/resources/filename` redirects and the bundled edge code sees the base URL.
- **`MEDIA_BASE_URL`** — used first on the **Node** server when resolving `<video>`, PDF iframe, and download links at request time.

Redeploy after changing either variable. Without them, the Resources page shows a warning banner and media URLs fall back to `/resources/...`, which **404** when those files are not in `public/`.

## verifiedsignal.io

The live product runs separately (see **verifiedsignal** repository). This Amplify app only serves **calgentik.com**.

## Further reading

- [AWS Amplify Hosting – Next.js](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
- [Deployment overview](./deployment.md)
