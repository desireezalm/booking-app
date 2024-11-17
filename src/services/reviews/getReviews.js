import { PrismaClient } from "@prisma/client";

const getReviews = async (propertyId) => {
  const prisma = new PrismaClient();
  let reviews = await prisma.review.findMany({
    include: {
      user: true,
      property: true,
    },
  });

  if (propertyId) {
    reviews = reviews.filter((review) => review.propertyId === propertyId);
    console.log(reviews);
  }

  return reviews;
};

export default getReviews;
