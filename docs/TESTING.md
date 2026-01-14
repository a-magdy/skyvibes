# API Integration Testing Guide 🧪

## Manual Testing Checklist

### Prerequisites

- [ ] `.env.local` file created with valid API key
- [ ] Development server running (`npm run dev`)
- [ ] Browser open to `http://localhost:3000`

### Test Cases

#### 1. Basic Search Functionality ✅

**Test**: Search for "London"

- **Expected**: Shows current weather for London, UK with temperature, condition, humidity, and precipitation
- **Success Criteria**: Weather data displays within 2 seconds

**Test**: Click quick city button "Copenhagen"

- **Expected**: Instantly loads weather for Copenhagen
- **Success Criteria**: Smooth transition to weather display

#### 2. Error Handling 🚨

**Test**: Search for "XYZ123NOTACITY"

- **Expected**: Friendly error message "Oops! We couldn't find..."
- **Success Criteria**: User can search again without refreshing

**Test**: Empty search

- **Expected**: Search does nothing or shows validation
- **Success Criteria**: No API call made

**Test**: Search with invalid API key (temporarily modify `.env.local`)

- **Expected**: "Weather API is not configured" error
- **Success Criteria**: Clear error message displayed

#### 3. Data Accuracy 📊

**Test**: Compare displayed data with OpenWeatherMap website

- Search same city on both platforms
- **Expected**: Temperature within 1-2 degrees (due to rounding)
- **Expected**: Weather condition matches (sunny, cloudy, etc.)
- **Success Criteria**: Data is consistent

#### 4. Loading States ⏳

**Test**: Observe loading animation

- Search for any city
- **Expected**: Bouncing cloud emoji with "Getting the weather vibes..."
- **Success Criteria**: Loading state shows before data appears

#### 5. Visual Elements 🎨

**Test**: Weather emoji matches condition

- Search multiple cities with different weather
- **Expected**: Sunny = ☀️, Cloudy = ☁️, Rainy = 🌧️, etc.
- **Success Criteria**: Correct emoji for each condition

**Test**: Emoji animation

- **Expected**: Weather emoji gently rotates/wobbles
- **Success Criteria**: Smooth, playful animation

#### 6. Multiple Searches 🔄

**Test**: Search 3-4 different cities in succession

- **Expected**: Each search updates the display correctly
- **Expected**: No stale data from previous searches
- **Success Criteria**: Clean state management

### API Response Verification

Open browser DevTools (F12) → Network tab and inspect:

**Endpoint**: `/api/weather?city=London`

**Expected Response Structure**:

```json
{
  "location": "London, GB",
  "current": {
    "temp": 72,
    "condition": "cloudy",
    "humidity": 65,
    "precipitation": 0,
    "description": "overcast clouds"
  },
  "today": {
    "high": 75,
    "low": 68,
    "feelsLike": 70
  },
  "wind": {
    "speed": 12,
    "direction": 180
  },
  "visibility": 6,
  "timestamp": "2026-01-14T10:30:00.000Z"
}
```

### Performance Checks ⚡

- [ ] Initial page load < 2 seconds
- [ ] Weather data loads < 1 second after search
- [ ] No console errors in browser DevTools
- [ ] Smooth animations without jank

### Browser Testing

Test in:

- [ ] Chrome/Edge (primary)
- [ ] Safari (iPad target)
- [ ] Firefox (optional)

### Device Testing

- [ ] Desktop (1920x1080)
- [ ] iPad (1024x768) - primary target!
- [ ] Mobile (375x667)

## Common Issues and Solutions

### Issue: "Failed to fetch" error

**Solution**: Check if dev server is running and API route exists at `/pages/api/weather.js`

### Issue: Data shows but emoji doesn't match

**Solution**: Check condition mapping in `weather.js` `mapWeatherCondition()` function

### Issue: Slow API responses

**Solution**: OpenWeatherMap free tier has rate limits; wait a moment between requests

### Issue: Stale data displayed

**Solution**: Clear browser cache or check API caching headers

## Automated Testing (Future)

```javascript
// Future test suite example
describe('Weather API Integration', () => {
  test('fetches weather for valid city', async () => {
    const data = await getCurrentWeather('London');
    expect(data).toHaveProperty('location');
    expect(data.current.temp).toBeGreaterThan(-100);
  });
  
  test('handles invalid city gracefully', async () => {
    await expect(getCurrentWeather('XYZ123')).rejects.toThrow();
  });
});
```

## Next Steps

Once all tests pass:

- [ ] Mark Phase 1, Step 2 complete in README.md ✅ (Done!)
- [ ] Move to Step 3: Enhanced search functionality
- [ ] Consider adding hourly forecasts (Phase 2)

---

**Testing Complete?** Awesome! The OpenWeatherMap integration is working! 🎉
