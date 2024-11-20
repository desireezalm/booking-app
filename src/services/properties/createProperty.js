import { PrismaClient } from "@prisma/client";

const createProperty = async (data) => {
  const prisma = new PrismaClient();
  const newProperty = {
    hostId: data.hostId,
    title: data.title,
    description: data.description,
    location: data.location,
    pricePerNight: data.pricePerNight,
    bedroomCount: data.bedroomCount,
    bathRoomCount: data.bathRoomCount,
    maxGuestCount: data.maxGuestCount,
    rating: data.rating,
  };

  const property = await prisma.property.create({
    data: newProperty,
  });

  return property;
};

export default createProperty;
