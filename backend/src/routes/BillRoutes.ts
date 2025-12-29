import { Router } from "express";
import { authGuard } from "../middlewares/authGuard.middlewares";
import {
  createBill,
  deleteBill,
  getBillById,
  listBills,
  updateBill,
} from "../controllers/bill.controller.js";
import {
  createBillValidation,
  updateBillValidation,
} from "../middlewares/billValidation.middlewares";
import { handleValidation } from "../middlewares/handleValidation.middlewares";

const billRoutes = Router();

billRoutes.use(authGuard);

billRoutes.post("/", createBillValidation(), handleValidation, createBill);
billRoutes.get("/", listBills);
billRoutes.get("/:id", getBillById);
billRoutes.patch("/:id", updateBillValidation(), handleValidation, updateBill);
billRoutes.delete("/:id", deleteBill);

export default billRoutes;
