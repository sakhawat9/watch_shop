/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // The SCSS source still uses `@import` throughout (core/all, common/all,
    // etc.). Dart Sass 1.80+ warns on every one of those since `@import` is
    // deprecated in favor of `@use`/`@forward`. Silencing here so dev/build
    // output isn't dominated by ~30 repeated warnings; the real migration to
    // `@use` happens in Phase 3 when this SCSS is reworked for the redesign.
    silenceDeprecations: ["import"],
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
