import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { prisma } from "../config/db";

export async function runMlAnalysis(analysisId: string, filePath: string, jobRole: string) {
  const form = new FormData();
  form.append("resume", fs.createReadStream(filePath));
  form.append("job_role", jobRole);

  try {
    const { data } = await axios.post(`${process.env.ML_SERVICE_URL}/analyze`, form, {
      headers: form.getHeaders(),
      timeout: 30000,
    });

    await prisma.$transaction([
      prisma.analysis.update({
        where: { id: analysisId },
        data: { atsScore: data.atsScore, resumeScore: data.resumeScore, status: "complete" },
      }),
      prisma.skill.createMany({
        data: data.skills.map((s: any) => ({ analysisId, skillName: s.name, type: s.type })),
      }),
      prisma.recommendation.createMany({
        data: data.recommendations.map((r: any) => ({ analysisId, title: r.title, description: r.description })),
      }),
    ]);
  } catch (err) {
      console.error("ML Analysis Error:", err);

    await prisma.analysis.update({ where: { id: analysisId }, data: { status: "failed" } });
    throw err;
  }
}