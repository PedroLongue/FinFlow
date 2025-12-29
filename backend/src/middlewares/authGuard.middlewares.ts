import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET não definido no .env");

interface AuthRequest extends Request {
  userId?: string;
}

export const authGuard = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ erros: ["Token ausente"] });
  }

  const token = header.slice("Bearer ".length).trim();

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub?: string };
    if (!payload.sub)
      return res.status(401).json({ erros: ["Token inválido"] });

    req.userId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ erros: ["Token inválido"] });
  }
};
