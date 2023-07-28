import jwt from "jsonwebtoken";
import errorHandler from "./errors.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Not Authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Invalid Token!"));

    req.user = user;
    next();
  });
};
