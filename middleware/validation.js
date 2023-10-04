const { body} = require('express-validator');

const validation = ()=> {
  return [
    body("title")
      .notEmpty()
      .withMessage("Please enter a title")
      .isLength({ min: 1, max: 10 })
      .withMessage("min 1 digit required & max 10 digits"),
    body("price")
      .notEmpty()
      .withMessage("Please enter a price")
      .isLength({ min: 1, max: 5 })
      .withMessage("min 1 digit required & max 10 digits")
  ]
}

module.exports = {
  validation
}
