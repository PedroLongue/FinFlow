import type { Request, Response } from "express";
import { prisma } from "../db/prisma.js";

interface AuthRequest extends Request {
  userId?: string;
}

const PAGE_SIZE = 10;

export const createBill = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ errors: ["Não autenticado"] });

  const {
    title,
    amount,
    dueDate,
    category,
    status,
    barcode,
    description,
    paidAt,
  } = req.body as {
    title: string;
    amount: number;
    dueDate: string; // ISO
    category: string;
    status?: "PENDING" | "PAID" | "OVERDUE" | "SCHEDULED" | "CANCELLED";
    barcode?: string | null;
    description?: string | null;
    paidAt?: string | null;
  };

  const bill = await prisma.bill.create({
    data: {
      title: String(title).trim(),
      amount: Number(amount),
      dueDate: new Date(dueDate),
      category: String(category).trim(),
      status: status ?? "PENDING",
      barcode: barcode?.trim() || null,
      description: description?.trim() || null,
      paidAt: paidAt ? new Date(paidAt) : null,
      userId,
    },
  });

  return res.status(201).json({ bill });
};

export const listBills = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ errors: ["Não autenticado"] });

  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const take = PAGE_SIZE;
  const skip = (page - 1) * take;

  const status = req.query.status as
    | "PENDING"
    | "PAID"
    | "OVERDUE"
    | "SCHEDULED"
    | "CANCELLED";

  const category = req.query.category ? String(req.query.category) : undefined;

  const where = {
    userId,
    ...(status ? { status } : {}),
    ...(category ? { category } : {}),
  };

  const [total, bills] = await Promise.all([
    prisma.bill.count({ where }),
    prisma.bill.findMany({
      where,
      orderBy: { dueDate: "asc" },
      skip,
      take,
    }),
  ]);

  return res.json({
    page,
    pageSize: take,
    total,
    totalPages: Math.ceil(total / take),
    bills,
  });
};

export const getBillById = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ errors: ["Não autenticado"] });

  const { id } = req.params;

  const bill = await prisma.bill.findFirst({
    where: { id, userId }, // garante que só pega do dono
  });

  if (!bill) return res.status(404).json({ errors: ["Boleta não encontrada"] });

  return res.json({ bill });
};

export const updateBill = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ errors: ["Não autenticado"] });

  const { id } = req.params;

  // garante propriedade antes de atualizar (evita update em item de outro usuário)
  const existing = await prisma.bill.findFirst({ where: { id, userId } });
  if (!existing)
    return res.status(404).json({ errors: ["Boleta não encontrada"] });

  const {
    title,
    amount,
    dueDate,
    category,
    status,
    barcode,
    description,
    paidAt,
  } = req.body as {
    title?: string;
    amount?: number;
    dueDate?: string; // ISO
    category?: string;
    status?: "PENDING" | "PAID" | "OVERDUE" | "SCHEDULED" | "CANCELLED";
    barcode?: string | null;
    description?: string | null;
    paidAt?: string | null;
  };

  const bill = await prisma.bill.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title: title.trim() } : {}),
      ...(amount !== undefined ? { amount: Number(amount) } : {}),
      ...(dueDate !== undefined ? { dueDate: new Date(dueDate) } : {}),
      ...(category !== undefined ? { category: category.trim() } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(barcode !== undefined
        ? { barcode: barcode ? barcode.trim() : null }
        : {}),
      ...(description !== undefined
        ? { description: description ? description.trim() : null }
        : {}),
      ...(paidAt !== undefined
        ? { paidAt: paidAt ? new Date(paidAt) : null }
        : {}),
    },
  });

  return res.json({ bill });
};

export const deleteBill = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ errors: ["Não autenticado"] });

  const { id } = req.params;

  const existing = await prisma.bill.findFirst({ where: { id, userId } });
  if (!existing)
    return res.status(404).json({ errors: ["Boleta não encontrada"] });

  await prisma.bill.delete({ where: { id } });

  return res.status(204).send();
};
