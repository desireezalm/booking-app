import express from "express";
// IMPORTS
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import checkMissingData from "../utils/checkMissingData.js";
import authJwt from "../middleware/auth.js";
import customErrorHandler from "../middleware/customErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { propertyId } = req.query;
    const reviews = await getReviews(propertyId);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
      if (!review) {
        res.status(404).json({ message: `Review with id ${id} not found` });
      } else {
        res.status(200).json(review);
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
    const dataRequired = ["userId", "propertyId", "rating", "comment"];
    const missingData = checkMissingData(data, dataRequired);

    if (missingData.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields: missingData,
      });
    }

    const newReview = await createReview(data);
    res.status(201).json(newReview);
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
      const { userId, propertyId, rating, comment } = req.body;
      const updatedReview = await updateReviewById(id, {
        userId,
        propertyId,
        rating,
        comment,
      });

      if (updatedReview) {
        res.status(200).send({
          message: `Review with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Review with id ${id} not found`,
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
      const review = await deleteReviewById(id);

      if (review) {
        res.status(200).send({
          message: `Review with id ${id} successfully deleted`,
          review,
        });
      } else {
        res.status(404).json({
          message: `Review with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

export default router;
