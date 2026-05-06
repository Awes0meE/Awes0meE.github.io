/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/work/juanyun-acunit-control-platform",
        destination: "/work/juanyun-thermal-hardware",
        permanent: false
      },
      {
        source: "/work/juanyun-baseunit-control-firmware",
        destination: "/work/juanyun-thermal-hardware",
        permanent: false
      },
      {
        source: "/work/juanyun-dht-sensor-breakout-board",
        destination: "/work/juanyun-thermal-hardware",
        permanent: false
      },
      {
        source: "/work/juanyun-actuator-fan-archive",
        destination: "/work/juanyun-thermal-hardware",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
