# SkyVibes Copilot Instructions 🌤️

## Project Overview

SkyVibes is a delightfully silly and minimal weather app designed primarily for iPad use at home (especially for kids). The project prioritizes **speed, simplicity, and smiles** over feature bloat. The interface is cartoonish, playful, and kid-friendly.

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS for rapid, responsive design
- **Weather API**: OpenWeatherMap (single provider to start)
- **Animations**: Framer Motion for delightful transitions
- **Deployment**: Vercel
- **Data Storage**: Local Storage (no database complexity initially)
- **Caching**: Next.js built-in caching

## Core Design Principles

### 1. Keep It Simple!

- Only show essential weather information
- Avoid feature bloat and complexity
- One main screen, minimal navigation
- Minimal cognitive load for users

### 2. Fun First!

- Cartoonish and playful design
- Silly weather animations and characters
- Weather should make you smile!
- Kid-friendly with big buttons, fun sounds, bright colors

### 3. Performance Matters

- Target: <1s initial load time
- Instant interactions
- Progressive loading with skeleton screens
- Efficient caching strategies

### 4. iPad-Optimized

- Primary target is iPad at home display
- Large touch targets for kids
- Responsive design that works on phones too
- Horizontal layouts where appropriate

## Coding Guidelines

### File Structure

```
skyvibes/
├── pages/              # Next.js pages
│   ├── index.js       # Main weather display
│   └── api/           # API routes for weather data
├── components/        # React components
│   ├── WeatherDisplay/
│   ├── SearchBox/
│   ├── HourlyForecast/
│   └── Animations/
├── styles/            # Global CSS and Tailwind
├── public/            # Static assets, weather icons
├── utils/             # Weather API helpers
└── hooks/             # Custom React hooks
```

### Component Guidelines

- Use functional React components with hooks
- Keep components small and focused
- Prioritize readability over cleverness
- Use meaningful, descriptive names
- Extract reusable logic into custom hooks

### Data Structure

Keep weather data structures simple and minimal:

```javascript
const weatherData = {
  location: "New York, NY",
  current: {
    temp: 72,
    condition: "sunny",
    humidity: 45,
    precipitation: 0,
  },
  today: {
    high: 78,
    low: 65,
  },
  hourly: [], // Just next 12 hours
  forecast: [], // Just 3 days max
};
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Create cartoonish, playful designs
- Use bright, vibrant colors
- Ensure large touch targets (min 44x44px)
- Implement fun loading states and animations
- Design for both light themes initially

### Animation Guidelines

- Use Framer Motion for all animations
- Keep animations delightful but fast (200-400ms)
- Create silly weather-themed characters
- Add fun transitions between states
- Include optional sound effects for interactions

### API Integration

- Use Next.js API routes to proxy weather API calls
- Implement proper error handling with cute error messages
- Cache responses appropriately
- Handle rate limiting gracefully
- Validate all API responses

### Error Handling

- Show friendly, kid-appropriate error messages
- Use cute illustrations for error states
- Provide clear recovery actions
- Never show technical error details to users
- Log errors properly for debugging

### Accessibility

- Include proper ARIA labels
- Ensure keyboard navigation works
- Use semantic HTML elements
- Provide text alternatives for icons
- Test with screen readers

## Development Workflow

### When Creating New Features

1. Start with the simplest implementation
2. Focus on core functionality first
3. Add "silly" elements as enhancements
4. Test on iPad screen sizes
5. Ensure fast load times

### When Writing Code

- Write clean, readable code
- Add helpful comments for complex logic
- Keep functions small and focused
- Follow existing patterns in the codebase
- Test edge cases (API failures, slow networks)

### Performance Considerations

- Use Next.js Image component for all images
- Implement code splitting for larger components
- Leverage Next.js caching mechanisms
- Minimize JavaScript bundle size
- Use lazy loading for below-fold content

## Current Phase: MVP

Focus on these core features:

- OpenWeatherMap API integration
- Simple city search functionality
- Current weather display (temp + condition)
- Today's high/low, humidity, precipitation
- Basic cartoonish styling with Tailwind

## Things to Avoid

- Complex state management (no Redux needed)
- Database complexity (use Local Storage)
- Too many features at once
- Heavy dependencies
- Over-engineering solutions
- Boring, serious weather apps

## Testing Approach

- Test on actual iPad devices
- Verify kid-friendliness with real users
- Check load times on slow connections
- Test error states thoroughly
- Ensure touch targets work well

## Questions to Ask When Uncertain

1. Does this make the app simpler or more complex?
2. Will kids find this fun and easy to use?
3. Does this slow down the app?
4. Is this essential for MVP or can it wait?
5. Does this align with our "silly and minimal" vision?

## Resources

- OpenWeatherMap API docs: https://openweathermap.org/api
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

Remember: When in doubt, choose simplicity, fun, and speed! 🎈
