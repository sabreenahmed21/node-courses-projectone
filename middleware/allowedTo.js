const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      const error = appError.create("You are not authorized to access this route", 401, httpStatusText.FAIL);
      return next(error);
    }
    next();
  }
}