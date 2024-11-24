import calcRating from "../calcRating.js";
import { describe, it, expect } from "vitest";

describe("calculate property rating function", () => {
  const testData = {
    id: "j2345678-90f1-2345-6789-abcdef012345",
    reviews: [
      {
        id: "j0123456-78f0-1234-5678-9abcdef01234",
        userId: "d4567890-12ef-0123-4567-89abcdef0123",
        propertyId: "j2345678-90f1-2345-6789-abcdef012345",
        rating: 4,
        comment:
          "Beautiful view! However, there were some minor issues with the bathroom.",
      },
      {
        id: "k1234567-89f0-1234-5678-9abcdef01234",
        userId: "e5678901-23f0-1234-5678-9abcdef01234",
        propertyId: "j2345678-90f1-2345-6789-abcdef012345",
        rating: 5,
        comment: "A perfect stay! Can't wait to come back.",
      },
    ],
  };

  const testDataNoReviews = {
    id: "j2345678-90f1-2345-6789-abcdef012345",
    reviews: [],
  };

  const testDataSingleReview = {
    id: "j2345678-90f1-2345-6789-abcdef012345",
    reviews: [
      {
        id: "k1234567-89f0-1234-5678-9abcdef01234",
        userId: "e5678901-23f0-1234-5678-9abcdef01234",
        propertyId: "j2345678-90f1-2345-6789-abcdef012345",
        rating: 5,
        comment: "A perfect stay! Can't wait to come back.",
      },
    ],
  };

  it("should return 4.5 rating", () => {
    const result = calcRating(testData);
    expect(result).toBe(4.5);
  });

  it("should return 0 for property without reviews", () => {
    const result = calcRating(testDataNoReviews);
    expect(result).toBe(0);
  });

  it("should handle a single review correctly", () => {
    const result = calcRating(testDataSingleReview);
    expect(result).toBe(5);
  });
});
