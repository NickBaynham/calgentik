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

## Hosting Resources media (S3, optional CloudFront)

Large files under **`public/resources/`** (video, audio, PDF) can live in S3 so the Git repo and Amplify bundle stay small. The site builds URLs from each file’s **exact filename** (as in [`data/resources.ts`](../data/resources.ts)).

**Amplify Hosting** serves your Next.js app from its own CloudFront distribution; it does **not** automatically front a separate bucket you create for media. You either expose files with **HTTPS S3 URLs** (public read on those objects) or put **your own** CloudFront distribution in front of the media bucket.

### 1. Bucket and keys

1. Create a bucket (e.g. `calgentik-media`) and choose a **prefix** (e.g. `calgentik-media/` at the bucket root, or a folder in the console).
2. **Object keys must match repo filenames**, including spaces—for example:
   - `calgentik-media/videoplayback.mp4`
   - `calgentik-media/VerifiedSignal_screen_recording_demo.mp4`
   - `calgentik-media/VerifiedSignal Reference Document_ Comprehensive Product & Architecture Guide.pdf`
3. **Without CloudFront:** use the bucket’s **S3 REST HTTPS** endpoint (see §3). Add a **bucket policy** (or object ACLs) so `s3:GetObject` is allowed for the prefix you intend to publish—browsers on `https://calgentik.com` need **HTTPS** media URLs (avoid the S3 **website** endpoint unless you only serve `http://`, or you will hit mixed-content issues).
4. **With CloudFront (optional):** private bucket + **Origin Access Control**, **GET**/**HEAD**, **byte-range** support (default) for smooth `<video>` seeking.

### 2. Upload (sync)

From the repo root, after a local `npm run build` is **not** required—copy straight from disk:

```bash
aws s3 sync ./public/resources/ s3://YOUR_BUCKET/calgentik-media/ \
  --exclude ".DS_Store" \
  --cache-control "public,max-age=31536000,immutable"
```

Set **Content-Type** on first upload (or fix metadata later). Examples:

```bash
aws s3 cp ./public/resources/VerifiedSignal_screen_recording_demo.mp4 \
  s3://YOUR_BUCKET/calgentik-media/VerifiedSignal_screen_recording_demo.mp4 \
  --content-type "video/mp4" --cache-control "public,max-age=31536000,immutable"
```

Use `video/mp4`, `audio/mp4` (or `audio/x-m4a`) for M4A, and `application/pdf` for PDFs.

### 3. Wire the Next.js app

Set **`NEXT_PUBLIC_MEDIA_BASE_URL`** to the **HTTPS** URL that maps to that prefix—**no trailing slash**.

**Direct S3 (no CloudFront)** — virtual-hosted–style URL (replace bucket, region, and prefix):

`https://YOUR_BUCKET.s3.YOUR_REGION.amazonaws.com/calgentik-media`

Example region hostnames: `s3.us-east-1.amazonaws.com`, `s3.eu-west-1.amazonaws.com`. You can confirm the exact hostname from the S3 console (**Properties** for an object → copy the object URL and remove the filename).

**CloudFront (optional):**

`https://dxxxxxxxxxx.cloudfront.net/calgentik-media`

The app will request:

`{NEXT_PUBLIC_MEDIA_BASE_URL}/{URL-encoded filename}`

So the path after the hostname must match the key prefix where you synced the files.

Add the variable in **Amplify → App settings → Environment variables** (and in `.env.local` for local testing), then redeploy.

### 4. Optional: different URL for the screen recording only

**`NEXT_PUBLIC_DEMO_VIDEO_URL`** overrides **only** the product demo asset (homepage + Resources). It wins over **`NEXT_PUBLIC_MEDIA_BASE_URL`** for that one file—useful if that video lives at a different path or hostname.

### 5. Stop tracking large binaries in Git (optional)

After S3/CloudFront is working in production:

```bash
git rm -r --cached public/resources/*.mp4 public/resources/*.m4a public/resources/*.pdf
# adjust patterns; keep tiny placeholders if you want CI to pass without CDN in PR builds
git commit -m "Serve resources from S3; drop large binaries from Git"
```

For **pull request previews** without the env var, either keep small test files in `public/resources/` or set **`NEXT_PUBLIC_MEDIA_BASE_URL`** on the preview branch in Amplify.

See also [`.env.example`](../.env.example).

## Domain split reminder

- **calgentik.com** — this static (or Amplify) site.
- **verifiedsignal.io** — application from the **verifiedsignal** repo (not deployed by this workflow).
