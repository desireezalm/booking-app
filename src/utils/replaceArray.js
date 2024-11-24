import excludeData from "./excludeData.js";

const replaceArray = (array, key) => {
  const publicData = array.map((item) => {
    const publicProfile = excludeData(item, [key]);
    return publicProfile;
  });
  return publicData;
};

export default replaceArray;
