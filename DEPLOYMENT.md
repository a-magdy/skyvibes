# 🚀 Deploying SkyVibes to GitHub Pages

This guide walks you through deploying the SkyVibes weather app to GitHub Pages. GitHub Pages is a free static site hosting service that's perfect for Next.js apps with static export.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ A GitHub account
- ✅ The SkyVibes repository forked or cloned
- ✅ Node.js 18+ installed locally (for testing)
- ✅ Admin access to the repository (to configure GitHub Pages settings)

## 🎯 Overview

GitHub Pages deployment for Next.js requires:

1. **Static Export Configuration** - Configure Next.js to generate static HTML files
2. **GitHub Actions Workflow** - Automate the build and deployment process
3. **Repository Settings** - Enable GitHub Pages in your repository
4. **Environment Variables** - Configure API keys and settings

## 📝 Step-by-Step Deployment Guide

### Step 1: Configure Next.js for Static Export

Next.js needs to be configured to output static files instead of running as a Node.js server.

#### 1.1 Update `next.config.js`

Modify your `next.config.js` file to enable static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  output: 'export', // Enable static HTML export
  basePath: process.env.NODE_ENV === 'production' ? '/skyvibes' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/skyvibes/' : '',
};

module.exports = nextConfig;
```

**Important Notes:**
- `output: 'export'` - Generates static HTML files
- `images.unoptimized: true` - Required because Next.js Image Optimization API doesn't work with static export
- `basePath` and `assetPrefix` - Set to your repository name (e.g., `/skyvibes`) for GitHub Pages subdomain hosting

#### 1.2 Update `package.json` scripts

Add an export script to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export"
  }
}
```

**Note:** With Next.js 14, `next build` with `output: 'export'` automatically generates static files in the `out/` directory.

### Step 2: Create GitHub Actions Workflow

GitHub Actions will automatically build and deploy your app whenever you push changes.

#### 2.1 Create workflow directory

```bash
mkdir -p .github/workflows
```

#### 2.2 Create deployment workflow file

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # Trigger deployment on push to main branch
  workflow_dispatch:  # Allow manual workflow trigger

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Next.js app
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    
    runs-on: ubuntu-latest
    needs: build
    
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**What this workflow does:**
1. **Triggers** on every push to the `main` branch
2. **Checks out** your code
3. **Sets up** Node.js environment
4. **Installs** dependencies with `npm ci` (faster and more reliable than `npm install`)
5. **Builds** the Next.js app with static export
6. **Uploads** the generated `out/` folder as an artifact
7. **Deploys** the artifact to GitHub Pages

### Step 3: Configure GitHub Repository Settings

#### 3.1 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Source: **GitHub Actions** (not Deploy from a branch)
5. Click **Save**

#### 3.2 Configure environment variables (if needed)

If your app uses API keys (like OpenWeatherMap):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secrets:
   - Name: `NEXT_PUBLIC_WEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
4. Update the workflow to use the secret:

```yaml
- name: Build Next.js app
  run: npm run build
  env:
    NODE_ENV: production
    NEXT_PUBLIC_WEATHER_API_KEY: ${{ secrets.NEXT_PUBLIC_WEATHER_API_KEY }}
```

**Important:** Only use `NEXT_PUBLIC_*` prefix for variables that should be exposed to the browser.

### Step 4: Update Code for GitHub Pages

#### 4.1 Handle base path in your code

If using links in your app, use Next.js `Link` component which automatically handles the base path:

```javascript
import Link from 'next/link';

// ✅ Correct - Next.js handles basePath automatically
<Link href="/about">About</Link>

// ❌ Avoid - Won't work with basePath
<a href="/about">About</a>
```

#### 4.2 Update API routes (if using)

GitHub Pages only serves static files, so Next.js API routes won't work. You have two options:

**Option A: Client-side API calls (Recommended for this project)**

Call weather APIs directly from the browser:

```javascript
// In your component
const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );
  return response.json();
};
```

**Option B: Use an external API service**

Deploy API routes to a separate service like:
- Vercel Serverless Functions
- AWS Lambda
- Netlify Functions

#### 4.3 Add `.nojekyll` file

Create a `.nojekyll` file in the `public/` directory to prevent GitHub Pages from processing your site with Jekyll:

```bash
touch public/.nojekyll
```

### Step 5: Deploy Your App

#### 5.1 Commit and push your changes

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

#### 5.2 Monitor the deployment

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see the "Deploy to GitHub Pages" workflow running
4. Click on the workflow run to see detailed logs
5. Wait for both "build" and "deploy" jobs to complete (usually 2-5 minutes)

#### 5.3 Verify deployment

Once the workflow completes:

1. Go to **Settings** → **Pages**
2. You'll see your site URL: `https://[your-username].github.io/skyvibes/`
3. Click the URL to visit your deployed app! 🎉

## 🔧 Troubleshooting

### Issue: 404 errors on page refresh

**Problem:** Refreshing any page other than the home page results in a 404 error.

**Solution:** This is expected with GitHub Pages and static exports. Each route needs its own HTML file. Next.js handles this automatically with static export, but you may need to configure fallback routes.

### Issue: Images not loading

**Problem:** Images show broken links or 404 errors.

**Solution:** 
- Ensure `images.unoptimized: true` is set in `next.config.js`
- Use relative paths for images in the `public/` folder
- Check that `assetPrefix` is correctly configured

### Issue: Environment variables not working

**Problem:** API calls fail because environment variables are undefined.

**Solution:**
- Ensure variables start with `NEXT_PUBLIC_` prefix
- Add secrets in GitHub repository settings
- Reference secrets in the workflow file
- Rebuild and redeploy after adding secrets

### Issue: CSS/JS files not loading (403 errors)

**Problem:** Styles and scripts fail to load with 403 forbidden errors.

**Solution:**
- Add a `.nojekyll` file to the `public/` directory
- Commit and push the change
- Redeploy the site

### Issue: Build fails in GitHub Actions

**Problem:** The workflow fails during the build step.

**Solution:**
- Check the Actions logs for specific error messages
- Ensure `package-lock.json` is committed
- Verify Node.js version compatibility
- Test the build locally: `npm run build`

### Issue: Wrong base path in production

**Problem:** Links and assets have incorrect paths.

**Solution:**
- Verify `basePath` and `assetPrefix` in `next.config.js`
- Use Next.js `Link` component instead of `<a>` tags
- Use `next/image` instead of `<img>` tags (or ensure proper path handling)

## 📊 Monitoring Your Deployment

### Check deployment status

View your deployment history:
1. Go to **Settings** → **Pages**
2. See recent deployments and their status
3. Access deployment logs from the Actions tab

### Update your site

Every push to the `main` branch triggers a new deployment:

```bash
# Make your changes
git add .
git commit -m "Update weather display"
git push origin main

# GitHub Actions automatically builds and deploys
```

### Manual deployment

Trigger a deployment manually:

1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the branch and click "Run workflow"

## 🎨 Custom Domain (Optional)

Want to use a custom domain like `skyvibes.com`?

### Step 1: Add CNAME file

Create `public/CNAME` file with your domain:

```
skyvibes.com
```

### Step 2: Configure DNS

Add DNS records with your domain provider:

**For apex domain (skyvibes.com):**
```
A Record: 185.199.108.153
A Record: 185.199.109.153
A Record: 185.199.110.153
A Record: 185.199.111.153
```

**For subdomain (www.skyvibes.com):**
```
CNAME Record: [your-username].github.io
```

### Step 3: Update GitHub settings

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Click **Save**
4. Wait for DNS check to complete
5. Enable "Enforce HTTPS" (recommended)

## 🚀 Performance Optimization

### Enable caching

GitHub Pages automatically caches static assets. Ensure proper cache headers by:

1. Using versioned asset names (Next.js does this automatically)
2. Setting appropriate cache durations for API responses

### Minimize bundle size

```bash
# Analyze bundle size
npm install -D @next/bundle-analyzer

# Update next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

### Use lazy loading

```javascript
// Lazy load components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

## 📚 Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)

## 🆘 Need Help?

- Check [GitHub Issues](https://github.com/a-magdy/skyvibes/issues) for similar problems
- Review [GitHub Actions logs](https://github.com/a-magdy/skyvibes/actions) for deployment errors
- Test locally: `npm run build` to verify static export works
- Visit [Next.js Discord](https://nextjs.org/discord) for community support

---

**Happy Deploying! 🎈**

*Last Updated: January 2026*
