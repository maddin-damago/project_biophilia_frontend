import { useEffect, useState } from "react";
import { getWeatherMoodIndex, type MoodIndexResponse } from "../api/weather";
import loadingSpinner from "../assets/loading.gif";

export default function WeatherWidget() {
  const [data, setData] = useState<MoodIndexResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeatherMoodIndex()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data)
    return (
      <div className="w-1/3 m-auto">
        <img src={loadingSpinner} alt="loading..." className="w-10 m-auto" />
      </div>
    );

  return (
    <div className="w-1/3 p-4 bg-yellow-100 rounded shadow my-4 mx-auto text-green-900">
      <b className="font-nature-light text-shadow-[0_1px_1px_rgba(0,0,0,0.4)] pb-2">
        <h3>BioPhiliaFlow Mood Score:</h3>
      </b>
      <span className="italic">
        {data.biophilia_mood_index ? data.biophilia_mood_index : "Nothing to see here yet!"}
      </span>
    </div>
  );
}
