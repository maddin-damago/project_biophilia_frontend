import { useEffect, useState } from "react";
import dataJSON from "../assets/recommendation.json";
import loadingSpinner from "../assets/loading.gif";

export interface Recommendation_Structure {
  fall: string;
  condition: string;
  kraeuter_einleitung: string;
  kraeuter_details: KraeuterDetail[];
  aktivität: string[];
  erklaerung: string;
}

export interface KraeuterDetail {
  trivialName: string;
  botanischerName: string;
  image_url: string;
  familie: string;
  ernte: string;
  erkennungsmerkmale: string[];
  verwechslungsgefahr: string[];
  vorkommen: string;
  heilwirkung: string;
}

export default function Results() {
  const [resultData, setResultData] = useState<Recommendation_Structure | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setResultData(dataJSON);
      } catch (err) {
        console.error(err);
        setError("Could not retrieve your result data from the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(resultData);

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
    <div className="grid max-w-6xl mx-auto shadow-xl rounded-lg bg-white p-8">
      <div className="text-green-900">
        <h3 className="text-xl font-bold mb-4">
          Basierend auf Deinen Eingaben und den aktuellen Wetterdaten, haben wir folgende Empfehlungen für Dich:
        </h3>
        <div className="p-4 my-4 space-y-2 text-left text-lg bg-white">
          <p>
            <strong>Kondition:</strong> {resultData.condition}
          </p>
          <p>
            <strong>Erklärung:</strong> {resultData.erklaerung}
          </p>
          <p>
            <strong>Einleitung:</strong> {resultData.kraeuter_einleitung}
          </p>

          {resultData.kraeuter_details.map((kd) => {
            return (
              <div className="w-4/5 mt-16 flex mx-auto justify-around">
                <div className="max-w-md">
                  <p>
                    <strong>Trivialname:</strong> {kd.trivialName}
                  </p>
                  <p>
                    <strong>Botanischer Name:</strong> {kd.botanischerName}
                  </p>
                  <p>
                    <strong>Familie:</strong> {kd.familie}
                  </p>
                  <p>
                    <strong>Ernte:</strong> {kd.ernte}
                  </p>
                  <p>
                    <strong>Erkennungsmerkmale:</strong>{" "}
                    {kd.erkennungsmerkmale.map((em) => {
                      return (
                        <ul>
                          <li className="mr-2">- {em}</li>
                        </ul>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Verwechslungsgefahr:</strong>{" "}
                    {kd.verwechslungsgefahr.map((vg) => {
                      return (
                        <ul>
                          <li className="mr-2">- {vg}</li>
                        </ul>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Vorkommen:</strong> {kd.vorkommen}
                  </p>
                  <p>
                    <strong>Heilwirkung:</strong> {kd.heilwirkung}
                  </p>
                </div>
                <img src={kd.image_url} alt={kd.trivialName} className="w-80 object-cover rounded shadow-xl" />
              </div>
            );
          })}
        </div>
        <p className="text-lg">
          <strong>Aktivität:</strong>{" "}
          {resultData.aktivität.map((a) => {
            return <p className="mr-2 mb-3">{a}</p>;
          })}
        </p>
      </div>
    </div>
  );
}
