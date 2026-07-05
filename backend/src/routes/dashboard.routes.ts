import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { getDashboard } from "../controllers/dashboard.controller";

const router = Router();

router.get("/dashboard", requireAuth, getDashboard);

export default router;