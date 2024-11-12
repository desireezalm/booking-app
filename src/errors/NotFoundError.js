class NotFoundError extends Error {
  constructor(resourceType, resourceId) {
    super(`${resourceType} with id ${resourceId} was not found.`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
