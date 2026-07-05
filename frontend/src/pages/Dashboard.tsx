import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

type RecentAnalysis = {
  id: string;
  jobRole: string;
  atsScore: number;
};

type DashboardData = {
  totalAnalyses: number;
  avgAtsScore: number;
  recentAnalyses: RecentAnalysis[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.get<DashboardData>("/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) return <p className="mt-20 text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-6">
        <div className="border rounded p-4 flex-1 text-center">
          <p className="text-3xl font-bold">{data.totalAnalyses}</p>
          <p className="text-sm text-gray-500">Total Analyses</p>
        </div>
        <div className="border rounded p-4 flex-1 text-center">
          <p className="text-3xl font-bold">{data.avgAtsScore}</p>
          <p className="text-sm text-gray-500">Avg ATS Score</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/analysis/new" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">
          New Analysis
        </Link>
        <Link to="/history" className="inline-block bg-gray-700 text-white px-4 py-2 rounded">
          History
        </Link>
        <Link to="/profile" className="inline-block bg-green-600 text-white px-4 py-2 rounded">
          Profile
        </Link>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Recent Analyses</h2>
        <ul className="space-y-2">
          {data.recentAnalyses.map((a) => (
            <li key={a.id} className="border p-3 rounded flex justify-between">
              <span>{a.jobRole}</span>
              <span>{a.atsScore}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}