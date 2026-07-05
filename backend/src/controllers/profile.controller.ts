import { Response, NextFunction } from "express";
import { z } from "zod";
import { AuthRequest } from "../middlewares/auth";
import { prisma } from "../config/db";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  githubUsername: z.string().min(1).optional(),
});

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = updateSchema.parse(req.body);
    const user = await prisma.user.update({ where: { id: req.userId }, data });
    res.json({ user: { id: user.id, name: user.name, email: user.email, githubUsername: user.githubUsername } });
  } catch (err) {
    next(err);
  }
}