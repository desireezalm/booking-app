const customErrorHandler = (err, req, res, next) => {
  if (err.name === "NotFoundError") {
    return res.status(404).json({ message: err.message });
  }

  if (err.name === "ForbiddenError") {
    return res.status(403).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }

  next(err);
};

export default customErrorHandler;
