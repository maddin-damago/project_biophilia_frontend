// Define the structure of the data you expect back from the Python backend
export interface UserFormData {
  age: string;
  energy_level: "low" | "mid" | "high" | "";
}

const BASE_URL = "http://localhost:8000/api";

export async function postUserData(
  userData: UserFormData,
): Promise<UserFormData> {
  const response = await fetch(`${BASE_URL}/user-mood`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch mood index: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getLatestUserMood(): Promise<UserFormData> {
  const response = await fetch(`${BASE_URL}/user-mood/latest`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch latest mood: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
