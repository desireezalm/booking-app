import { PrismaClient } from "@prisma/client";

const createBooking = async (data) => {
  const prisma = new PrismaClient();
  const newBooking = {
    userId: data.userId,
    propertyId: data.propertyId,
    checkinDate: data.checkinDate,
    checkoutDate: data.checkoutDate,
    numberOfGuests: data.numberOfGuests,
    totalPrice: data.totalPrice,
    bookingStatus: data.bookingStatus,
  };

  const booking = await prisma.booking.create({
    data: newBooking,
  });

  return booking;
};

export default createBooking;
