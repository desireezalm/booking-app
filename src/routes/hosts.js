import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import authJwt from "../middleware/auth.js";
import customErrorHandler from "../middleware/customErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);

    const publicHostData = () => {
      for (const host of hosts) {
        const publicProfile = {
          id: host.id,
          username: host.username,
          name: host.name,
          email: host.email,
          phoneNumber: host.phoneNumber,
          profilePicture: host.profilePicture,
          aboutMe: host.aboutMe,
        };
        return publicProfile;
      }
    };
    res.status(200).json(publicHostData(hosts));
  } catch (error) {
    res.status(500).send("Something went wrong while getting list of hosts!");
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      if (!host) {
        res.status(404).json({ message: `Host with id ${id} not found` });
      } else {
        res.status(200).json(host);
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

router.post("/", authJwt, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    res.status(500).send("Something went wrong while creating a new host!");
    next(error);
  }
});

router.put(
  "/:id",
  authJwt,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const updatedHost = await updateHostById(id, {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      });

      if (updatedHost) {
        res.status(200).send({
          message: `Host with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Host with id ${id} not found`,
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
      const host = await deleteHostById(id);

      if (host) {
        res.status(200).send({
          message: `User with id ${id} successfully deleted`,
          host,
        });
      } else {
        res.status(404).json({
          message: `Host with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

export default router;
