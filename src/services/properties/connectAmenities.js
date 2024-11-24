// Started this function for future use
// Any tips on how to accomplish this functionality are welcome

import { PrismaClient } from "@prisma/client";

const connectAmenities = async (id, amenityId) => {
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
