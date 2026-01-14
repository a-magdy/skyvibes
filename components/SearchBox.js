import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="mb-8"
    >
      <div className="flex gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name... 🏙️"
          className="flex-1 px-6 py-4 text-2xl rounded-full border-4 border-white shadow-lg focus:outline-none focus:ring-4 focus:ring-sunny-yellow transition-all"
          aria-label="City search"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="touch-target px-8 py-4 bg-sunny-yellow text-gray-800 text-2xl font-bold rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
          aria-label="Search for weather"
        >
          🔍 Go!
        </motion.button>
      </div>
    </motion.form>
  );
}
