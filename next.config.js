/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "refferer-policy", value: "no-referrer" }],
      },
    ];
  },
};

module.exports = nextConfig;
