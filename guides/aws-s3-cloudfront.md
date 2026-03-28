# S3 + CloudFront (alternative static hosting)

Use this path only if you are comfortable running the site as a **fully static** export. The default `next.config.ts` in this repo does **not** enable static export so that **AWS Amplify** can run full Next.js.

## When S3 + CloudFront is appropriate

- You have enabled **`output: 'export'`** (and usually `images: { unoptimized: true }` if you rely on `next/image`).
- `next build` produces an **`out/`** directory with HTML, assets, and client bundles.
- You do **not** need server-side rendering, Route Handlers, or dynamic server features incompatible with export.

If any of the above is false, use **Amplify** instead (see [aws-amplify.md](./aws-amplify.md)).

## Enable static export (required for S3)

In `next.config.ts`, add (only for this deployment mode):

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};
```

Re-run `npm run build` and confirm the **`out/`** folder exists.

**Trade-off:** Commit this only on a branch dedicated to static hosting, or maintain a clear comment so production Amplify builds (non-export) are not accidentally broken.

## GitHub Actions example

See [`.github/workflows/deploy-static-example.yml`](../.github/workflows/deploy-static-example.yml).

Prerequisites:

1. Static export enabled and `out/` produced by `npm run build`.
2. GitHub repository variables: `AWS_ROLE_TO_ASSUME`, `AWS_REGION`, `S3_BUCKET`; optional `CLOUDFRONT_DISTRIBUTION_ID`.
3. IAM role for GitHub OIDC with S3 (and optionally CloudFront) permissions — see [deployment.md](./deployment.md).

The workflow is **skipped** until `AWS_ROLE_TO_ASSUME` and `S3_BUCKET` are set, so default pushes to `main` do not fail.

## S3 bucket

- Create a private or public-read bucket (CloudFront will be the public edge; bucket can stay private with OAC/OAI).
- Enable **Block Public Access** if using CloudFront origin access.
- Sync **`out/`** contents to the bucket root (the example workflow uses `aws s3 sync out/ s3://$S3_BUCKET/ --delete`).

## CloudFront

- Create a distribution with S3 (or origin access control) as origin.
- **Default root object:** `index.html`.
- **Error pages (SPA-like):** For pure static multi-page Next export, each route has an HTML file; custom error → `/index.html` is usually **not** required unless you use client-only routing.
- **ACM certificate:** Must be in **us-east-1** for CloudFront.
- After deploy, **invalidate** `/*` or specific paths (workflow optional step).

## Route 53

- Create **A/AAAA alias** records for `calgentik.com` (and `www`) pointing to the CloudFront distribution.

## Cost and operations

- You manage cache TTLs, invalidations, and bucket lifecycle.
- Large media under `public/` increases sync time and origin storage; consider moving heavy assets to S3/CloudFront separately or using external CDN URLs.

## Hosting the product demo video (S3 + CloudFront)

The screen recording used on the homepage and **Resources** can stay out of the Git repo and Amplify bundle by serving it from S3 (optionally in front of CloudFront).

1. **Create a bucket** (e.g. `calgentik-media`) in the same account/region you prefer. For a public object URL or CloudFront origin, either:
   - use a **bucket policy** allowing `s3:GetObject` for `arn:aws:s3:::bucket-name/media/*` (and block public access off only for that prefix pattern if you use a dedicated prefix), or
   - keep the bucket **private** and use **CloudFront** with **Origin Access Control (OAC)** so only the distribution can read objects (recommended for production).

2. **Upload the file** (replace local path and key):

   ```bash
   aws s3 cp ./path/to/verifiedsignal-demo.mp4 \
     s3://YOUR_BUCKET/media/verifiedsignal-demo.mp4 \
     --content-type "video/mp4"
   ```

   Prefer a **re-encoded H.264 `.mp4`** for smaller size and broader browser support; set `--content-type video/mp4` accordingly.

3. **CloudFront (optional but typical):** Create a distribution with the S3 bucket as origin, allow **GET** and **HEAD**, and use the object URL like `https://dxxxxxxxxxx.cloudfront.net/media/verifiedsignal-demo.mp4`. Ensure the response supports **byte-range requests** (default for S3/CloudFront) so the `<video>` element can seek.

4. **Wire the site:** Set **`NEXT_PUBLIC_DEMO_VIDEO_URL`** to that **HTTPS** URL in Amplify (**App settings → Environment variables**) and redeploy. The app will stream and link to S3/CloudFront instead of `/resources/...`.

See also [`.env.example`](../.env.example).

## Domain split reminder

- **calgentik.com** — this static (or Amplify) site.
- **verifiedsignal.io** — application from the **verifiedsignal** repo (not deployed by this workflow).
