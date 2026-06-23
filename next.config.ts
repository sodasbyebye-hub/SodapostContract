import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],
  outputFileTracingIncludes: {
    "/api/admin/exports": [
      "./node_modules/@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff",
      "./node_modules/@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff",
      "./node_modules/@fontsource/noto-sans/files/noto-sans-latin-ext-400-normal.woff",
      "./node_modules/@fontsource/noto-sans/files/noto-sans-latin-ext-700-normal.woff",
      "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-400-normal.woff",
      "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff",
      "./node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-korean-400-normal.woff",
      "./node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-korean-700-normal.woff",
      "./node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff",
      "./node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-700-normal.woff",
      "./node_modules/@fontsource/noto-sans-thai/files/noto-sans-thai-thai-400-normal.woff",
      "./node_modules/@fontsource/noto-sans-thai/files/noto-sans-thai-thai-700-normal.woff",
    ],
  },
};

export default nextConfig;
