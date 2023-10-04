const express = require('express');
const router = express.Router();
const userController = require("../controllers/user-control");
const verifyToken = require('../middleware/verifyToken');

const multer  = require('multer');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const uniqueSuffix = `user-${Date.now()}.${ext}`;
    cb(null, uniqueSuffix)
  }
})

function fileFilter (req, file, cb) {
  const imgType = file.mimetype.split('/')[0];
  if(imgType === 'image'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage: diskStorage , fileFilter});


router.route('/').get(verifyToken, userController.getAllUsers);
router.route('/register').post(upload.single('avatar'), userController.register);
router.route('/login').post(userController.loginUsers);

module.exports = router;
