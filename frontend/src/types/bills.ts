export type BillStatusKey =
  | "PENDING"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED"
  | "UNPAID";

export interface IBill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  category: string | null;
  status: BillStatusKey;
  createdAt: string;
  barcode: string | null;
  description: string | null;
  paidAt: string | null;
  userId: string;
}
