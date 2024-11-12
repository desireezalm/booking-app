class ForbiddenError extends Error {
  constructor(resourceType, resourceId) {
    super(`Denied access to ${resourceType} with id ${resourceId}.`);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
