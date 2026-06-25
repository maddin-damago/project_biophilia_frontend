import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { postUserData, type UserFormData } from "../api/userData";

const initialFormState: UserFormData = {
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
};

type QuestionKey = "q1" | "q2" | "q3" | "q4" | "q5";

export default function UserInput() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleRadioChange = (questionId: QuestionKey, questionText: string, scoreValue: number) => {
    setFormData((prev) => ({
      ...prev,
      // We save the full metadata object into the specific question key
      [questionId]: {
        text: questionText,
        score: scoreValue,
      },
    }));
  };

  const isFormInvalid = Object.values(formData).includes(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);

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

  const questions: { id: QuestionKey; text: string }[] = [
    { id: "q1", text: "I have felt cheerful and in good spirits" },
    { id: "q2", text: "I have felt calm and relaxed" },
    { id: "q3", text: "I have felt active and vigorous" },
    { id: "q4", text: "I woke up feeling fresh and rested" },
    { id: "q5", text: "My daily life has been filled with things that interest me" },
  ];

  return (
    <div className="max-w-md p-6 my-4 mx-auto bg-slate-50 border rounded-xl shadow-xs border-stone-200">
      <h2 className="mb-4 font-nature-light font-bold text-2xl text-emerald-900">Biophilic Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "20px" }}>
            <p>
              <strong>{q.text}</strong>
            </p>
            {[5, 4, 3, 2, 1, 0].map((score) => (
              <label key={score} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  name={q.id}
                  value={score}
                  // Crucial step: checked is true ONLY if the state matches the score
                  checked={formData[q.id]?.score === score}
                  onChange={() => handleRadioChange(q.id, q.text, score)}
                />{" "}
                {score}
              </label>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className={`w-full px-4 py-2 mt-4 text-white font-medium transition-colors rounded-lg
            ${isFormInvalid ? "bg-gray-300" : "bg-emerald-700"} focus:outline-none focus:ring-2 focus:ring-emerald-600
            focus:ring-offset-2`}
          disabled={isFormInvalid}
        >
          {loading ? "Calculating..." : "Get Advice"}
        </button>
      </form>
    </div>
  );
}
