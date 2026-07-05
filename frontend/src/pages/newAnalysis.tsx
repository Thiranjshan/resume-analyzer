// frontend/src/pages/NewAnalysis.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function NewAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jobRole) return alert("Select a file and enter a job role");

    const form = new FormData();
    form.append("resumeFile", file);
    form.append("jobRole", jobRole);

    const res = await api.post("/analysis", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate(`/analysis/${res.data.analysisId}/processing`);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">New Analysis</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="resumeFile" className="block font-medium">Upload Resume</label>
        <input id="resumeFile" type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />
        <input placeholder="Target job role" value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Analyze</button>
      </form>
    </div>
  );
}