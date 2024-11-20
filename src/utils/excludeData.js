const excludeData = (resource, keys) => {
  return Object.fromEntries(
    Object.entries(resource).filter(([key]) => !keys.includes(key))
  );
};

export default excludeData;
