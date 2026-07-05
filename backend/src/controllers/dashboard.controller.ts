import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth";
import { prisma } from "../config/db";

export async function getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const analyses = await prisma.analysis.findMany({
      where: { userId: req.userId, status: "complete" },
      orderBy: { createdAt: "desc" },
    });

    const totalAnalyses = analyses.length;
    const avgAtsScore = totalAnalyses
      ? Math.round(analyses.reduce((sum, a) => sum + (a.atsScore || 0), 0) / totalAnalyses)
      : 0;

    res.json({ totalAnalyses, avgAtsScore, recentAnalyses: analyses.slice(0, 5) });
  } catch (err) {
    next(err);
  }
}