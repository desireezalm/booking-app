import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import checkMissingData from "../utils/checkMissingData.js";
import authJwt from "../middleware/auth.js";
import customErrorHandler from "../middleware/customErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();

    res.status(200).json(amenities);
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong while getting list of amenities!");
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);
      if (!amenity) {
        res.status(404).json({ message: `Amenity with id ${id} not found` });
      } else {
        res.status(200).json(amenity);
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

    const dataRequired = ["name"];

    const missingData = checkMissingData(data, dataRequired);

    if (missingData.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields: missingData,
      });
    }

    const newAmenity = await createAmenity(data);
    res.status(201).json(newAmenity);
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
      const { name } = req.body;
      const updatedAmenity = await updateAmenityById(id, {
        name,
      });

      if (updatedAmenity) {
        res.status(200).send({
          message: `Amenity with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Amenity with id ${id} not found`,
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
      const amenity = await deleteAmenityById(id);

      if (amenity) {
        res.status(200).send({
          message: `Amenity with id ${id} successfully deleted`,
          amenity,
        });
      } else {
        res.status(404).json({
          message: `Amenity with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

export default router;
