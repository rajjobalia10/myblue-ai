/** @type {import('next').NextConfig} */
// Configure Next.js for static export so it can be deployed on GitHub Pages.
// When running in GitHub Actions, use the repository name as basePath/assetPrefix
// so that assets resolve correctly at https://<user>.github.io/<repo>/
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1]}` : '',
  assetPrefix: isGithubActions ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1]}/` : '',
};

module.exports = nextConfig;
