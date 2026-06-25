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
    { id: "q1", text: "Ich habe mich fröhlich und gut gelaunt gefühlt" },
    { id: "q2", text: "Ich habe mich ruhig und entspannt gefühlt" },
    { id: "q3", text: "Ich habe mich aktiv und voller Energie gefühlt" },
    { id: "q4", text: "Ich bin frisch und ausgeruht aufgewacht" },
    { id: "q5", text: "Mein Alltag ist voller Dinge, die mich interessieren" },
  ];

  return (
    <div className="max-w-2xl p-6 my-4 mx-auto bg-slate-50 border rounded-xl shadow-xs border-stone-200">
      <div className="flex-row justify-center mx-auto max-w-lg">
        <h2 className="mb-4 font-nature-light font-bold text-2xl text-emerald-900">Wie erging es Dir heute?</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="mb-4">
              <p className="mb-2">
                <strong>{q.text}</strong>
              </p>
              <div className="flex items-center">
                <strong className="font-normal text-sm mb-1 mr-8">Stimmt voll zu</strong>
                <div>
                  {[5, 4, 3, 2, 1, 0].map((score) => (
                    <label key={score} className="mr-2">
                      <input
                        type="radio"
                        name={q.id}
                        value={score}
                        checked={formData[q.id]?.score === score}
                        onChange={() => handleRadioChange(q.id, q.text, score)}
                      />{" "}
                      {score}
                    </label>
                  ))}
                </div>
                <strong className="font-normal text-sm ml-6">Stimmt gar nicht zu</strong>
              </div>
              {index !== questions.length - 1 && <hr className="mt-2" />}
            </div>
          ))}

          <button
            type="submit"
            className={`w-full px-4 py-2 mt-4 text-white font-medium transition-colors rounded-lg
              ${isFormInvalid ? "bg-gray-300" : "bg-emerald-700"} focus:outline-none focus:ring-2 focus:ring-emerald-600
              focus:ring-offset-2`}
            disabled={isFormInvalid}
          >
            {loading ? "Berechne..." : "Ratschlag holen"}
          </button>
          <div className="mt-1 max-w-lg mx-auto">
            <div className="max-w-lg mt-2 italic text-md mx-auto leading-5">
              <p>
                <strong className="mr-2">Hinweis:</strong>Der abgefragte Score basiert auf "The World Health
                Organization-Five Well-Being Index (WHO-5)".
              </p>
              <p>
                {" "}
                Diese App ist ein Portfolioprojekt und hat keinerlei Anspruch auf medizinisch/wissenschafftliche
                Genauigkeit.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
