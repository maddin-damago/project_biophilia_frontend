import { useEffect, useState } from "react";

import WeatherWidget from "../components/WeatherWidget";
import { type UserFormData } from "../api/userData";

import loadingSpinner from "../assets/loading.gif";

export default function Results() {
  const [resultData, setResultData] = useState<UserFormData | null | string[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = ["Nothing to see here"];
        setResultData(data);
      } catch (err) {
        console.error(err);
        setError("Could not retrieve your result data from the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-1/3 p-6 max-w-md mx-auto text-center">
        <p className="text-gray-600 font-medium">
          <img src={loadingSpinner} alt="loading..." className="w-10 m-auto" />
        </p>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto text-center">
        <p className="text-red-500 font-semibold mb-4">{error || "No data available."}</p>
      </div>
    );
  }
  return (
    <div className="grid">
      <div className="w-1/3 mx-auto text-green-900">
        <h2 className="text-2xl font-bold mb-4">
          Your <span className="font-nature-light text-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">BioPhiliaFlow</span> Results
        </h2>

        <div className="border-t border-b py-4 my-4 space-y-2 text-left">
          <b>Coming Soon...</b>
        </div>
      </div>
      <WeatherWidget />
    </div>
  );
}
