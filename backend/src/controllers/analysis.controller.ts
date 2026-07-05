import { Request,Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth";
import { prisma } from "../config/db";
import { runMlAnalysis } from "../services/ml.service";

export async function createAnalysis(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    const { jobRole } = req.body;
    if (!file) return res.status(400).json({ error: "resumeFile is required" });

    const analysis = await prisma.analysis.create({
      data: { userId: req.userId!, jobRole, status: "processing" },
    });
    await prisma.resume.create({
      data: { analysisId: analysis.id, filePath: file.path, parsedText: "" },
    });

    res.status(202).json({ analysisId: analysis.id, status: "processing" });
        runMlAnalysis(analysis.id, file.path, jobRole).catch((e) => console.error("ML analysis failed:", e));

  } catch (err) {
    next(err);
  }
  
}

export async function getAnalysis(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const analysis = await prisma.analysis.findFirst({
      where: { id, userId: req.userId },
      include: { skills: true, recommendations: true },
    });
    if (!analysis) return res.status(404).json({ error: "Not found" });
    res.json(analysis);
  } catch (err) {
    next(err);
  }
}

// controller
export async function getHistory(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const history = await prisma.analysis.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, jobRole: true, atsScore: true, status: true, createdAt: true },
    });
    res.json(history);
  } catch (err) {
    next(err);
  }
}

export async function deleteAnalysis(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await prisma.$transaction(async (tx) => {
      if (!id) {
        throw new Error("analysis id is required");
      }

      await tx.recommendation.deleteMany({
        where: { analysisId: id },
      });

      await tx.skill.deleteMany({
        where: { analysisId: id },
      });

      await tx.resume.deleteMany({
        where: { analysisId: id },
      });

      await tx.analysis.deleteMany({
        where: {
          id,
          userId: req.userId,
        },
      });
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}