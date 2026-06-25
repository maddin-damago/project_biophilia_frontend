// Define the structure of the data you expect back from the Python backend
export type UserFormData = {
  q1: Record<string, string | number> | null;
  q2: Record<string, string | number> | null;
  q3: Record<string, string | number> | null;
  q4: Record<string, string | number> | null;
  q5: Record<string, string | number> | null;
};

const BASE_URL = "http://localhost:8000/api";

export async function postUserData(userData: UserFormData): Promise<UserFormData> {
  const response = await fetch(`${BASE_URL}/user-mood`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch mood index: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
