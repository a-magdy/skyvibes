import { motion } from "framer-motion";

const weatherEmojis = {
  sunny: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  snowy: "❄️",
  stormy: "⛈️",
};

export default function WeatherDisplay({ data }) {
  if (!data) return null;

  const { location, current, today } = data;
  const emoji = weatherEmojis[current.condition] || "🌤️";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="weather-card"
    >
      {/* Location */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{location}</h2>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="text-9xl"
        >
          {emoji}
        </motion.div>

        <div>
          <div className="big-temp">{current.temp}°</div>
          <div className="text-2xl text-gray-600 capitalize">
            {current.condition}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t-2 border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-2">⬆️</div>
          <div className="text-3xl font-bold text-gray-800">{today.high}°</div>
          <div className="text-lg text-gray-600">High</div>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">⬇️</div>
          <div className="text-3xl font-bold text-gray-800">{today.low}°</div>
          <div className="text-lg text-gray-600">Low</div>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">💧</div>
          <div className="text-3xl font-bold text-gray-800">
            {current.humidity}%
          </div>
          <div className="text-lg text-gray-600">Humidity</div>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">🌧️</div>
          <div className="text-3xl font-bold text-gray-800">
            {current.precipitation}%
          </div>
          <div className="text-lg text-gray-600">Rain</div>
        </div>
      </div>
    </motion.div>
  );
}
