import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import checkMissingData from "../utils/checkMissingData.js";
import authJwt from "../middleware/auth.js";
import customErrorHandler from "../middleware/customErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong while getting list of bookings!");
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);
      if (!booking) {
        res.status(404).json({ message: `Booking with id ${id} not found` });
      } else {
        res.status(200).json(booking);
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
      "userId",
      "propertyId",
      "checkinDate",
      "checkoutDate",
      "numberOfGuests",
      "totalPrice",
      "bookingStatus",
    ];

    const missingData = checkMissingData(data, dataRequired);

    if (missingData.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields: missingData,
      });
    }

    const newBooking = await createBooking(data);
    res.status(201).json(newBooking);
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
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;
      const updatedBooking = await updateBookingById(id, {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      });

      if (updatedBooking) {
        res.status(200).send({
          message: `Booking with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Booking with id ${id} not found`,
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
      const booking = await deleteBookingById(id);

      if (booking) {
        res.status(200).send({
          message: `Booking with id ${id} successfully deleted`,
          booking,
        });
      } else {
        res.status(404).json({
          message: `Booking with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  customErrorHandler
);

export default router;
