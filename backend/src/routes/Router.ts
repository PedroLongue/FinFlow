import { Request, Response, Router } from "express";
import userRoutes from "./UserRoutes";
import billRoutes from "./BillRoutes";

const router = Router();

router.get("/api", (req: Request, res: Response) => {
  res.send("API is running");
});

router.use("/api/users", userRoutes);
router.use("/api/bills", billRoutes);

export default router;
