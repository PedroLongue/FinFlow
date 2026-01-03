import { Router } from "express";
import {
  getCurrentUser,
  getUserById,
  login,
  logout,
  register,
  updateUserPhone,
} from "../controllers/auth.controller";
import {
  loginValidation,
  phoneValidation,
  userCreateValidation,
} from "../middlewares/userValidation.middlewares";
import { handleValidation } from "../middlewares/handleValidation.middlewares";
import { authGuard } from "../middlewares/authGuard.middlewares";

const userRoutes = Router();

userRoutes.post(
  "/register",
  userCreateValidation(),
  handleValidation,
  register
);

userRoutes.post("/login", loginValidation(), handleValidation, login);

userRoutes.post("/logout", authGuard, logout);

userRoutes.get("/profile", authGuard, getCurrentUser);

userRoutes.patch(
  "/profile",
  authGuard,
  phoneValidation(),
  handleValidation,
  updateUserPhone
);

userRoutes.get("/:id", getUserById);

export default userRoutes;
