const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courses-control");
const { validation} = require('../middleware/validation');
const verifyToken = require('../middleware/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');

router.route('/')
  .get(courseController.getAllCourses)
  .post(verifyToken ,validation() ,courseController.addCourse);  

router.route('/:id')
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANGER) ,courseController.removeCourse);

module.exports = router;
