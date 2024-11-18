import { PrismaClient } from "@prisma/client";

const connectAmenities = async (id, amenityIds) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.updateMany({
    where: { id },
    data: {
      amenities: {
        connect: [{ id: amenityId }],
      },
    },
  });

  return property.count > 0 ? id : null;
};

export default connectAmenities;
