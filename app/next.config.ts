import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack workspace root to this app's directory.
  // Next.js otherwise detects D:/Antigravity/package-lock.json (a sibling project)
  // and warns about ambiguous root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
