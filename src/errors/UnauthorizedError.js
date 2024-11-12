class UnauthorizedError extends Error {
  constructor(resourceType, resourceId) {
    super(
      `Invalid credentials provided to gain access to ${resourceType} with id ${resourceId}.`
    );
    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
