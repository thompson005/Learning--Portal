import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build for Docker / DGX self-hosting: emits
  // .next/standalone with a minimal node_modules and a server.js entrypoint.
  // Vercel ignores this and builds normally.
  output: "standalone",
  // tesseract.js dynamically requires its worker script at runtime; letting the
  // bundler try to statically resolve/inline it breaks the path (MODULE_NOT_FOUND).
  // Keeping it external forces a real require() against node_modules at runtime instead.
  serverExternalPackages: ["tesseract.js"],
};

export default nextConfig;
