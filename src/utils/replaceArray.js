import excludeData from "./excludeData.js";

const replaceArray = (array, key) => {
  const publicData = array.map((item) => {
    const publicProfile = excludeData(item, [key]);
    return publicProfile;
  });
  console.log(publicData);
  console.log(Array.isArray(publicData));
  return publicData;
};

export default replaceArray;
