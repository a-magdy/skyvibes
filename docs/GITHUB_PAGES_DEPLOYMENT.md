# Deploying SkyVibes to GitHub Pages 🚀

Your SkyVibes app has been refactored for GitHub Pages deployment!

## What Changed

✅ **Frontend-Only Architecture**
- Weather API calls now happen directly from the browser
- Uses wttr.in (free, no API key required)
- No server-side code needed

✅ **Static Export Configuration**
- Next.js configured for static HTML export
- Images optimized for static hosting
- Base path set for GitHub Pages

✅ **Automatic Deployment**
- GitHub Actions workflow created
- Deploys automatically on push to main branch

## Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 - everything should work as before!

### 3. Build Static Site

```bash
npm run build
```

This creates an `out/` directory with your static site.

### 4. Push to GitHub

```bash
git add .
git commit -m "Refactor for GitHub Pages deployment"
git push origin main
```

### 5. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/a-magdy/skyvibes`
2. Click **Settings** → **Pages** (in the sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Click **Save**

### 6. Deploy!

The GitHub Actions workflow will automatically:
- Build your app
- Deploy to GitHub Pages
- Make it live at: `https://a-magdy.github.io/skyvibes/`

You can watch the deployment progress in the **Actions** tab of your repository.

## Manual Deployment (Optional)

If you prefer to deploy manually:

```bash
npm run deploy
```

This uses the `gh-pages` package to deploy the `out/` folder directly.

## Configuration Notes

### Base Path

The app is configured to use `/skyvibes` as the base path in production (in [next.config.js](next.config.js)). If your repository name is different, update this line:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME' : '',
```

### Weather API

The app now calls wttr.in directly from the browser:
- ✅ No API key required
- ✅ Free and unlimited
- ✅ CORS-enabled for browser requests
- ⚠️ Note: Some corporate networks may block external API calls

## Troubleshooting

### 404 Error After Deployment

Make sure:
1. GitHub Pages is enabled in repository settings
2. The base path in `next.config.js` matches your repo name
3. The `.nojekyll` file exists in the `out/` directory

### Weather Not Loading

1. Check browser console for CORS errors
2. Verify internet connection
3. Try a different city name
4. Some networks may block wttr.in - try a different network

### Build Fails in GitHub Actions

1. Check the Actions tab for error details
2. Ensure all dependencies are in `package.json`
3. Try building locally first: `npm run build`

## Updating Your Site

Just push changes to the `main` branch:

```bash
git add .
git commit -m "Update weather display"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy! 🎉

## Local Development

```bash
npm run dev        # Development server
npm run build      # Build for production
npm run export     # Build and create .nojekyll
npm run deploy     # Manual deployment to gh-pages
```

---

**Your site will be live at:** https://a-magdy.github.io/skyvibes/

Enjoy your silly weather app on GitHub Pages! 🌤️✨
