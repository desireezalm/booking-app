import { PrismaClient } from "@prisma/client";

const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: true,
      property: true,
    },
  });
  return booking;
};

export default getBookingById;
