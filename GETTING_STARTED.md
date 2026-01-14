# Getting Started with SkyVibes 🌤️

## Quick Setup (5 minutes!)

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Weather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Go to "API keys" section in your account
4. Copy your API key (it may take 10-15 minutes to activate)

### 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Open .env.local and add your API key
# NEXT_PUBLIC_OPENWEATHER_API_KEY=paste_your_key_here
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app! 🎉

## Testing the App

Try searching for these cities:

- **Copenhagen** - Beautiful Scandinavian weather
- **Tokyo** - East Asian vibes
- **Oslo** - Nordic climate
- **New York** - The Big Apple

Or use the quick city buttons at the top!

## Troubleshooting

### "Weather API is not configured" Error

- Make sure you've created `.env.local` file (not `.env.local.example`)
- Check that your API key is correctly copied
- Wait 10-15 minutes after creating your OpenWeatherMap account for the key to activate
- Restart your dev server after adding the API key

### "City not found" Error

- Check spelling of the city name
- Try using full city name (e.g., "New York City" instead of "NYC")
- Some smaller cities might not be in the database

### Network Errors

- Check your internet connection
- Verify OpenWeatherMap is not experiencing downtime
- Check browser console for detailed error messages

## What's Next?

Check the [README.md](README.md) for the full roadmap! The next steps are:

- ✅ OpenWeatherMap API integration (Done!)
- 📝 Enhanced search with autocomplete
- 🎨 More fun animations and silly characters
- 📊 Hourly forecasts
- 🗓️ 3-day weather outlook

## Need Help?

- Check the [OpenWeatherMap API docs](https://openweathermap.org/api)
- Look at the [Next.js documentation](https://nextjs.org/docs)
- Review the project's `.github/copilot-instructions.md` for coding guidelines

Happy coding! 🚀
