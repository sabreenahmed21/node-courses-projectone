const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    const err = appError.create("token is required" , 401, httpStatusText.ERROR);
    return next(err);
  }
  const token = authHeader.split(' ')[1];
  try {
    const currentUser = jwt.verify(token, process.env.SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (error) {
    const err = appError.create("invalid token" , 401, httpStatusText.ERROR);
    return next(err);
  }
}
module.exports = verifyToken;