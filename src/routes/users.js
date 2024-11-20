import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import checkMissingData from "../utils/checkMissingData.js";
import authJwt from "../middleware/auth.js";
import customErrorHandler from "../middleware/customErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Something went wrong while getting list of users!");
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

router.post("/", authJwt, async (req, res, next) => {
  try {
    const data = req.body;

    const dataRequired = [
      "username",
      "password",
      "name",
      "email",
      "phoneNumber",
      "profilePicture",
    ];

    const missingData = checkMissingData(data, dataRequired);
    if (missingData.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields: missingData,
      });
    }

    const newUser = await createUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  authJwt,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const updatedUser = await updateUserById(id, {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
      });

      if (updatedUser) {
        res.status(200).send({
          message: `User with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `User with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

router.delete(
  "/:id",
  authJwt,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await deleteUserById(id);

      if (user) {
        res.status(200).send({
          message: `User with id ${id} successfully deleted`,
          user,
        });
      } else {
        res.status(404).json({
          message: `User with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

export default router;
