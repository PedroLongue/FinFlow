import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

export const authGuard = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  if (!JWT_SECRET) throw new Error("JWT_SECRET não definido no .env");
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ erros: ["Token ausente"] });
  }

  const token = header.slice("Bearer ".length).trim();

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id?: string };

    if (!payload.id) return res.status(401).json({ erros: ["Token inválido"] });

    req.userId = payload.id;
    return next();
  } catch {
    return res.status(401).json({ erros: ["Token inválido"] });
  }
};
