import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import {
  loginValidation,
  userCreateValidation,
} from "../middlewares/userValidation.middlewares";
import { handleValidation } from "../middlewares/handleValidation.middlewares";

const userRoutes = Router();

userRoutes.post(
  "/register",
  userCreateValidation(),
  handleValidation,
  register
);

userRoutes.post("/login", loginValidation(), handleValidation, login);

export default userRoutes;
