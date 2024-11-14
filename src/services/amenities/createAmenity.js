import { PrismaClient } from "@prisma/client";

const createAmenities = async (name) => {
  const newAmenity = {
    name,
  };

  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.create({
    data: newAmenity,
  });

  return amenity;
};

export default createAmenities;
