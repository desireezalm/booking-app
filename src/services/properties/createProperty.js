import { PrismaClient } from "@prisma/client";

const createProperty = async (
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating
) => {
  const newProperty = {
    hostId,
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
  };

  const prisma = new PrismaClient();
  const property = await prisma.property.create({
    data: newProperty,
  });

  return property;
};

export default createProperty;
