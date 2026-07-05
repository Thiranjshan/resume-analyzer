import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { updateProfile } from "../controllers/profile.controller";

const router = Router();
router.put("/", requireAuth, updateProfile);
export default router;