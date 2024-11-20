import { PrismaClient } from "@prisma/client";

const createAmenities = async (data) => {
  const prisma = new PrismaClient();
  const newAmenity = {
    name: data.name,
  };

  const amenity = await prisma.amenity.create({
    data: newAmenity,
  });

  return amenity;
};

export default createAmenities;
