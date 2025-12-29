import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma.js";

const signToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não definido");

  return jwt.sign({ id: userId }, secret, { expiresIn: "4d" });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ erros: ["name, email e password são obrigatórios"] });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const exists = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (exists) return res.status(409).json({ erros: ["Email já cadastrado"] });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: hashed,
      phone: phone?.trim() || null,
    },
    select: { id: true, name: true, email: true, phone: true },
  });

  const token = signToken(user.id);
  return res.status(201).json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ erros: ["email e password são obrigatórios"] });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (!user) return res.status(401).json({ erros: ["Credenciais inválidas"] });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ erros: ["Credenciais inválidas"] });

  const token = signToken(user.id);
  return res.json({
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
};
