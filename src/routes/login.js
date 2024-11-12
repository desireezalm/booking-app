import { Router } from "express";
import userLogin from "../services/auth/userLogin.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await userLogin(username, password);
    if (!token) {
      res.status(401).json({ message: "Invalid credentials!" });
    } else {
      res.status(200).json({ message: "Successfully logged in!", token });
    }
  } catch {
    next(error);
  }
});

export default router;
