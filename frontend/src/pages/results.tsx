import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

type Skill = {
  id: string;
  skillName: string;
  type: "matched" | "missing" | string;
};

type Recommendation = {
  id: string;
  title: string;
  description: string;
};

type AnalysisResult = {
  id: string;
  jobRole: string;
  atsScore: number;
  resumeScore: number;
  skills: Skill[];
  recommendations: Recommendation[];
};

export default function Results() {
  const { id } = useParams();
  const [data, setData] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get<AnalysisResult>(`/analysis/${id}`).then((res) => setData(res.data));
  }, [id]);

  if (!data) return <p className="mt-20 text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 space-y-6">
      <h1 className="text-2xl font-bold">Results — {data.jobRole}</h1>
      <div className="flex gap-6">
        <ScoreCard label="ATS Score" value={data.atsScore} />
        <ScoreCard label="Resume Score" value={data.resumeScore} />
      </div>
      <div>
        <h2 className="font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s) => (
            <span key={s.id} className={`px-2 py-1 rounded text-sm ${
              s.type === "matched" ? "bg-green-100 text-green-700" :
              s.type === "missing" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
            }`}>{s.skillName}</span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Recommendations</h2>
        <ul className="space-y-2">
          {data.recommendations.map((r) => (
            <li key={r.id} className="border p-3 rounded">
              <p className="font-medium">{r.title}</p>
              <p className="text-sm text-gray-600">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded p-4 flex-1 text-center">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}