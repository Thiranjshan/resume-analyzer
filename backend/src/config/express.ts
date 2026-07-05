import express from "express";
import cors from "cors";
import { prisma } from "./db";
import authRoutes from "../routes/auth.routes";
import { errorHandler } from "../middlewares/errorHandler";
import { requireAuth } from "../middlewares/auth";  
import analysisRoutes from "../routes/analysis.routes";
import dashboardRoutes from "../routes/dashboard.routes";
import profileRoutes from "../routes/profile.routes";
// ...inside createApp, add:

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api", authRoutes);
  app.use("/api/analysis", analysisRoutes);
  app.use("/api", dashboardRoutes);
  app.use(errorHandler);
  app.use("/api/profile", profileRoutes);

//app.get("/api/whoami", requireAuth, (req: any, res) => res.json({ userId: req.userId }));


  
  //p.get("/db-check", async (req, res) => {
  //const count = await prisma.user.count();
  //res.json({ userCount: count });
//});


  return app;
}