import express from "express";
import getUsers from "../services/users/getUsers.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const users = await getUsers(name);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of users!");
    next(error);
  }
});

export default router;
