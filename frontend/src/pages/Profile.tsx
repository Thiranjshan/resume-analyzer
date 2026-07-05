import { useState } from "react";
import { api } from "../services/api";

export default function Profile() {
  const [githubUsername, setGithubUsername] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put("/profile", { githubUsername });
    setSaved(true);
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSave} className="space-y-3">
        <input
          placeholder="GitHub username"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Save</button>
        {saved && <p className="text-green-600 text-sm">Saved!</p>}
      </form>
    </div>
  );
}