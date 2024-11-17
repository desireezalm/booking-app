const calcRating = (property) => {
  if (property.reviews.length > 0) {
    let queryArray = property.reviews;
    //console.log(property.title);
    let result = queryArray.reduce((total, item) => {
      return total + item.rating;
    }, 0);
    //console.log(result / queryArray.length);
    return result / queryArray.length;
  } else if ((property.reviews.length = 0)) {
    return 0;
  }
};

export default calcRating;
