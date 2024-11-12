import jwt from "jsonwebtoken";

const authJwt = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!token) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this content!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this content!" });
    }

    req.user = decoded;
    next();
  });
};

export default authJwt;
