// Created for future use.
// Calculates the accurate rating in property object based on
// the ratings in reviews, instead of the current manual INT value.

const calcRating = (property) => {
  if (property.reviews.length > 0) {
    let queryArray = property.reviews;
    let result = queryArray.reduce((total, item) => {
      return total + item.rating;
    }, 0);
    return result / queryArray.length;
  } else {
    return 0;
  }
};

export default calcRating;
