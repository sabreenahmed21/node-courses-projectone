const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user-model');
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require('bcrypt');
const appError = require('../utils/appError');
const generateJWT = require('../utils/generateJWT');


const getAllUsers=  asyncWrapper(
  async (req, res) => {
    const users = await User.find({},{"__v":false});
    res.json({status : httpStatusText.SUCCESS,data :{ users}});
  }
)

const register = asyncWrapper (
  async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const oldUser = await User.findOne({email});
    if(oldUser){
      return res.status(400).json({status : httpStatusText.ERROR,data :{message : "User already exists"}});
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({firstName, lastName, email, password: hashPassword, role, avatar: req.file.filename});
    const token =await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});
    newUser.token = token;
    await  newUser.save();
    res.status(201).json({status : httpStatusText.SUCCESS,data :{user: newUser}});
  }
)

const loginUsers = asyncWrapper ( async(req, res)=> {
  const { email, password} = req.body;
  if(!email && !password) {
    const error = appError.create("email and password are required" , 404, httpStatusText.FAIL);
    return next(error);
  }
  const user = await User.findOne({email: email});
  const matchedPassword = bcrypt.compare(password, user.password);
  if(!user ||!matchedPassword) {
    const error = appError.create("Invalid email or password", 404, httpStatusText.FAIL);
    return next(error);
  } else {
    const token =await generateJWT({email: user.email, id: user._id, role: user.role});
    res.status(200).json({status : httpStatusText.SUCCESS, data:{token}});
  }
  
});

module.exports = {
  getAllUsers,
  register,
  loginUsers
}

