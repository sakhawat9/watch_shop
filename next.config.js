/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // When DATA_SOURCE=json, the repositories read data/*.json through
  // fs.readFileSync(path.join(process.cwd(), "data", …)). That path is built at
  // runtime, so Next's dependency tracing can't see it and the JSON files are
  // left out of the serverless bundle — on Vercel every collection would come
  // back empty and the storefront would render with no products at all.
  // Tracing them in explicitly keeps the JSON backend working once deployed.
  outputFileTracingIncludes: {
    "/**": ["./data/**/*.json"],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "img-c.udemycdn.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

module.exports = nextConfig;
