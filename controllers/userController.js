const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const User = require("../models/userModel");
//const { registerValidation, loginValidation } = require("../middleware/validation");
// const JWT_KEY = process.env.JWT_KEY;
const JWT_KEY = "qwertyuiop";


exports.signUp = async (req, res, next) => {
  console.log(req.body)
  //const { error, value } = registerValidation(req.body); //validation
 // if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (emailExist) return res.status(400).send({ message: "Email already exist!" });

  try {
    const newUser = await createUserObj(req);
    const savedUser = await User.create(newUser);
    return res.status(200).send({ message: "User created successfully!", user: savedUser });
  } catch (err) {
    return res.status(400).send({ error: "User not created successfully!", error: err });
  }
};

exports.logIn = async (req, res) => {
  //const { error } = loginValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (!foundUser) return res.status(400).send({ message: "invalid login credential" });

  try {
    const isMatch = await bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch) return res.status(400).send({ message: "invalid login credential" });

    // create and assign jwt
    const token = await jwt.sign({ _id: foundUser._id }, JWT_KEY);

    return res.status(200).header("auth-token", token).send({ "auth-token": token, userId: foundUser._id });
  } catch (error) {
    return res.status(400).send(error);
  }
};



const createUserObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
}
