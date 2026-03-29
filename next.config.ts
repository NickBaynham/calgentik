import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Deployment notes:
 *
 * - **AWS Amplify (preferred):** Keep the default config below. Amplify Hosting
 *   runs `next build` and serves the app with full Next.js support (no static
 *   export required). See `amplify.yml` and `guides/aws-amplify.md`.
 *
 * - **S3 + CloudFront (static only):** Static hosting cannot run a Node server.
 *   You must opt in to a static HTML export:
 *     output: "export",
 *     images: { unoptimized: true }, // often required with `next/image` + export
 *   Then `next build` writes to `./out`. See `guides/aws-s3-cloudfront.md` and
 *   `.github/workflows/deploy-static-example.yml`.
 */

/** S3 / CDN base for files not in `public/resources/` (read at `next build` on Amplify). */
function mediaBaseForRedirects(): string | null {
  const v =
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim() || process.env.MEDIA_BASE_URL?.trim();
  return v ? v.replace(/\/$/, "") : null;
}

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  transpilePackages: ["swagger-ui-react"],
  /**
   * Works when Edge Middleware env is missing. Use `:file` (one segment) so `/resources`
   * still serves the page; `/resources/:path*` incorrectly matched bare `/resources` in Next.
   */
  async redirects() {
    const base = mediaBaseForRedirects();
    if (!base) return [];
    return [
      {
        source: "/resources/:file",
        destination: `${base}/:file`,
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
