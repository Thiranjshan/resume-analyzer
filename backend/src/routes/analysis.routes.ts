import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middlewares/auth";
import { createAnalysis , getAnalysis, getHistory , deleteAnalysis  } from "../controllers/analysis.controller";
 
const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } });
const router = Router();

router.post("/", requireAuth, upload.single("resumeFile"), createAnalysis);

router.get("/:id", requireAuth, getAnalysis);
// route
router.get("/", requireAuth, getHistory);
router.delete("/:id", requireAuth, deleteAnalysis);

export default router;
