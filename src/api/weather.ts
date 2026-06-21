// Define the structure of the data you expect back from the Python backend
export interface MoodIndexResponse {
  location: Record<string, number>;
  average_cloud_cover_percent: number;
  average_sunlight_w_m2: number;
  biophilia_mood_index: string;
}

const BASE_URL = "http://localhost:8000/api";

export async function getWeatherMoodIndex(): Promise<MoodIndexResponse> {
  const response = await fetch(`${BASE_URL}/weather/mood-index`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch mood index: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
