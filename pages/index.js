import { useState } from "react";
import Head from "next/head";
import WeatherDisplay from "../components/WeatherDisplay";
import SearchBox from "../components/SearchBox";
import { getCurrentWeather } from "../utils/weatherApi";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(city);
      setWeatherData(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SkyVibes 🌤️ - Fun Weather for Kids!</title>
        <meta name="description" content="A delightfully silly weather app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg mb-2">
            SkyVibes 🌤️
          </h1>
          <p className="text-xl text-white drop-shadow">
            Your fun weather friend!
          </p>
        </header>

        <SearchBox onSearch={handleSearch} />

        {loading && (
          <div className="text-center py-20">
            <div className="text-4xl animate-bounce">☁️</div>
            <p className="text-white text-xl mt-4">
              Getting the weather vibes...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-red-100 rounded-3xl border-4 border-red-300 shadow-lg">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-red-600 text-xl font-bold px-6">{error}</p>
          </div>
        )}

        {!loading && !error && weatherData && (
          <WeatherDisplay data={weatherData} />
        )}

        {!loading && !error && !weatherData && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white text-2xl">
              Search for a city to see the weather!
            </p>
          </div>
        )}
      </main>
    </>
  );
}
