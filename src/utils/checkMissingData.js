const checkMissingData = (data, dataRequired) => {
  const missingData = dataRequired.filter(
    (key) => data[key] === undefined || data[key] === null
  );
  return missingData;
};

export default checkMissingData;
