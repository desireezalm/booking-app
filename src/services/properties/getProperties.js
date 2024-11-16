import { PrismaClient } from "@prisma/client";
import calcRating from "../../utils/calcRating.js";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  let properties = await prisma.property.findMany({
    include: {
      amenities: true,
      bookings: true,
      reviews: true,
      host: false,
    },
  });

  if (location) {
    properties = properties.filter((property) =>
      property.location.includes(location)
    );
  }

  if (pricePerNight) {
    properties = properties.filter(
      (property) => property.pricePerNight == pricePerNight
    );
  }

  if (amenities) {
    properties = properties.filter((property) => {
      if (property.amenities.find(({ name }) => name === amenities)) {
        return property;
      }
    });
  }

  /*
  properties.forEach((property) => {
    calcRating(property);
  });
  */

  return properties;
};

export default getProperties;
