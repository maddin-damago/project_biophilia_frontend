import { useEffect, useState } from "react";
import { getWeatherMoodIndex, type MoodIndexResponse } from "../api/weather";

export default function WeatherWidget() {
  const [data, setData] = useState<MoodIndexResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeatherMoodIndex()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div>Loading biophilia data...</div>;

  return (
    <div className="w-1/3 p-4 bg-yellow-200 italic rounded shadow my-4 mx-auto">
      <h3>
        <b>BioPhiliaFlow Mood Score</b>: {data.biophilia_mood_index}
      </h3>
    </div>
  );
}
