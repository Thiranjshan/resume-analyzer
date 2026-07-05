import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

type HistoryItem = {
  id: string;
  jobRole: string;
  status: string;
  atsScore?: number | null;
};

export default function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  const load = () => api.get<HistoryItem[]>("/analysis").then((res) => setItems(res.data));

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/analysis/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete analysis");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <ul className="space-y-2">
        {items.map((a) => (
          <li key={a.id} className="border p-3 rounded flex justify-between items-center">
            <Link to={`/analysis/${a.id}/results`} className="flex-1">
              {a.jobRole} — {a.status} — {a.atsScore ?? "—"}
            </Link>
            <button onClick={() => handleDelete(a.id)} className="text-red-600 text-sm ml-4">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}