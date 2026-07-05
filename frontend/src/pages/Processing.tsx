// frontend/src/pages/Processing.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Processing() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await api.get(`/analysis/${id}`);
      if (res.data.status === "complete") {
        clearInterval(interval);
        navigate(`/analysis/${id}/results`);
      } else if (res.data.status === "failed") {
        clearInterval(interval);
        alert("Analysis failed. Please try again.");
        navigate("/results");
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [id, navigate]);

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full" />
      <p className="mt-4">Analyzing your resume...</p>
    </div>
  );
}