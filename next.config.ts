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
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  transpilePackages: ["swagger-ui-react"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
