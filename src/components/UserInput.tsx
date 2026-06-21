import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { postUserData, type UserFormData } from "../api/userData";

export default function UserInput() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    age: "",
    energy_level: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);

    if (!formData.age || !formData.energy_level) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const payload: UserFormData = formData;
      // 1. Call your API function
      const responseData = await postUserData(payload);

      // 2. Navigate to results page and pass the backend response data in history state
      navigate("/results", { state: responseData });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong fetching your mood index.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 my-4 mx-auto bg-white border rounded-xl shadow-xs border-stone-200">
      <h2 className="mb-4 font-nature text-2xl text-emerald-900">Biophilic Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-stone-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g., 28"
            className="w-full px-3 py-2 border rounded-lg bg-stone-50 border-stone-300 text-stone-900 focus:outline-none
              focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="energy_level" className="block text-sm font-medium text-stone-700 mb-1">
            Current Mood
          </label>
          <select
            id="energy_level"
            name="energy_level"
            value={formData.energy_level}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-stone-50 border-stone-300 text-stone-900 focus:outline-none
              focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          >
            <option value="" disabled>
              Select your energy level...
            </option>
            <option value="low">Low</option>
            <option value="mid">Mid</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full px-4 py-2 mt-4 text-white font-medium transition-colors rounded-lg
            ${!formData.age || !formData.energy_level ? "bg-gray-300" : "bg-emerald-700"} hover:bg-emerald-800
            focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2`}
          disabled={!formData.age || !formData.energy_level}
        >
          {loading ? "Calculating..." : "Get Advice"}
        </button>
      </form>
    </div>
  );
}
