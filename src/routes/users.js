import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import authJwt from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);

    const publicUserData = () => {
      for (const user of users) {
        const publicProfile = {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePicture: user.profilePicture,
        };
        return publicProfile;
      }
    };
    res.status(200).json(publicUserData(users));
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
  }
  //customErrorHandler
);

router.post("/", authJwt, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send("Something went wrong while creating a new user!");
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
  }
  //customErrorHandler
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
  }
  //customErrorHandler
);

export default router;
