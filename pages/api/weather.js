/**
 * Next.js API Route: Weather Data
 * Fetches weather data from wttr.in (free, no API key required!)
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { city } = req.query;

  // Validate city parameter
  if (!city || typeof city !== "string" || city.trim().length === 0) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    // Call wttr.in API for weather data (JSON format)
    const weatherUrl = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

    const weatherResponse = await fetch(weatherUrl, {
      headers: {
        "User-Agent": "SkyVibes/1.0",
      },
    });

    if (!weatherResponse.ok) {
      if (weatherResponse.status === 404) {
        return res.status(404).json({
          error: `Oops! We couldn't find "${city}". Try another city! 🔍`,
        });
      }
      throw new Error(`Weather API responded with ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    // Validate the response
    if (!weatherData.current_condition || !weatherData.current_condition[0]) {
      throw new Error("Invalid weather data received");
    }

    const current = weatherData.current_condition[0];
    const nearest = weatherData.nearest_area?.[0];
    const weather = weatherData.weather?.[0] || {};

    // Transform the API response to our simple data structure
    const transformedData = {
      location: nearest
        ? `${nearest.areaName?.[0]?.value || city}, ${
            nearest.country?.[0]?.value || ""
          }`
        : city,
      current: {
        temp: Math.round(parseFloat(current.temp_C)),
        condition: mapWeatherCondition(current.weatherCode),
        humidity: parseInt(current.humidity),
        precipitation: parseInt(current.precipMM || 0),
        description: current.weatherDesc?.[0]?.value || "Unknown",
      },
      today: {
        high: Math.round(parseFloat(weather.maxtempC || current.temp_C)),
        low: Math.round(parseFloat(weather.mintempC || current.temp_C)),
        feelsLike: Math.round(parseFloat(current.FeelsLikeC)),
      },
      wind: {
        speed: Math.round(parseFloat(current.windspeedMiles)),
        direction: current.winddir16Point || "N",
      },
      visibility: Math.round(parseFloat(current.visibilityMiles || 10)),
      hourly:
        weather.hourly?.slice(0, 12).map((hour) => ({
          time: hour.time,
          temp: Math.round(parseFloat(hour.tempC)),
          condition: mapWeatherCondition(hour.weatherCode),
          precipitation: parseInt(hour.precipMM || 0),
        })) || [],
      forecast:
        weatherData.weather?.slice(0, 3).map((day) => ({
          date: day.date,
          high: Math.round(parseFloat(day.maxtempC)),
          low: Math.round(parseFloat(day.mintempC)),
          condition: mapWeatherCondition(day.hourly?.[4]?.weatherCode || "113"),
        })) || [],
      timestamp: new Date().toISOString(),
    };

    // Set cache headers (10 minutes)
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");

    return res.status(200).json(transformedData);
  } catch (error) {
    console.error("Weather API Error:", error);
    return res.status(500).json({
      error:
        "Oops! Something went wrong getting the weather. Try again in a moment! 🌈",
    });
  }
}

/**
 * Map wttr.in weather codes to our simple condition names
 * Based on: https://github.com/chubin/wttr.in/blob/master/lib/constants.py
 * @param {string} code - wttr.in weather code
 * @returns {string} Simplified condition name
 */
function mapWeatherCondition(code) {
  const codeNum = parseInt(code);

  // Sunny/Clear
  if (codeNum === 113) return "sunny";

  // Partly cloudy
  if (codeNum === 116) return "partly-cloudy";

  // Cloudy
  if ([119, 122].includes(codeNum)) return "cloudy";

  // Foggy/Misty
  if ([143, 248, 260].includes(codeNum)) return "foggy";

  // Light rain/drizzle
  if ([176, 263, 266, 281, 284, 293, 296].includes(codeNum)) return "rainy";

  // Moderate to heavy rain
  if ([299, 302, 305, 308, 353, 356, 359].includes(codeNum)) return "rainy";

  // Thunderstorm
  if ([386, 389, 392, 395].includes(codeNum)) return "stormy";

  // Snow
  if (
    [
      179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 362,
      365, 368, 371, 374, 377,
    ].includes(codeNum)
  )
    return "snowy";

  // Sleet
  if ([311, 314, 284].includes(codeNum)) return "rainy";

  // Default to partly cloudy
  return "partly-cloudy";
}
