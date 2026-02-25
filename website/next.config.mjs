import { codeInspectorPlugin } from 'code-inspector-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: codeInspectorPlugin({
      bundler: 'turbopack',
      hotKeys: ['altKey'],
    }),
  },
}

export default nextConfig
