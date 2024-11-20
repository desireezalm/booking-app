import { PrismaClient } from "@prisma/client";

const createReview = async (data) => {
  const prisma = new PrismaClient();
  const newReview = {
    userId: data.userId,
    propertyId: data.propertyId,
    rating: data.rating,
    comment: data.comment,
  };

  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;
