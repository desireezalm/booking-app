import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      property: true,
    },
  });

  if (userId) {
    bookings = bookings.filter((booking) => booking.userId === userId);
  }

  return bookings;
};

export default getBookings;
