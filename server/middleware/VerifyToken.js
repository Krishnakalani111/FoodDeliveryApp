import jwt from "jsonwebtoken"

import ErrorHandler from "./ErrorHandler.js";


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new ErrorHandler(401, 'Unauthorized');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new ErrorHandler('Invalid Token');
  }
};

export default verifyToken;
