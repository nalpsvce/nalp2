const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const Vendor = require("../models/vendorModel");
//const { registerValidation, loginValidation } = require("../middleware/validation");
// const JWT_KEY = process.env.JWT_KEY;
const JWT_KEY = 'qwertyuiop';


// signup
exports.signUp = async (req, res, next) => {
//   const { error, value } = registerValidation(req.body); //validation
//   if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await Vendor.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (emailExist) return res.status(400).send({ message: "Email already exist!" });

  try {
    const newVendor = await createVendorObj(req);
    const savedVendor = await Vendor.create(newVendor);
    return res.status(200).send({ message: "Vendor created successfully!", vendor: savedVendor });
  } catch (err) {
    return res.status(400).send({ error: "Vendor not created successfully!", error: err });
  }
};

// login
exports.logIn = async (req, res) => {
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

  const foundVendor = await Vendor.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (!foundVendor) return res.status(400).send({ message: "invalid login credential" });

  try {
    const isMatch = await bcrypt.compareSync(req.body.password, foundVendor.password);
    if (!isMatch) return res.status(400).send({ message: "invalid login credential" });

    // create and assign jwt
    const token = await jwt.sign({ _id: foundVendor._id }, JWT_KEY);

    return res.status(200).header("auth-token", token).send({ "auth-token": token, userId: foundVendor._id });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Update user
// exports.updateVendor = async (req, res) => {
//   try {
//     req.body.password = bcrypt.hashSync(req.body.password, 10); //encrypt the password before updating
//     const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });

//     if (!updatedUser) {
//       return res.status(400).send({ message: "Could not update user" });
//     }
//     return res.status(200).send({ message: "User updated successfully", updatedUser });

//   } catch (error) {
//     return res.status(400).send({ error: "An error has occurred, unable to update user" });
//   }
// };

// Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.userId); // the `await` is very important here!

//     if (!deletedUser) {
//       return res.status(400).send({ message: "Could not delete user" });
//     }
//     return res.status(200).send({ message: "User deleted successfully", user: deletedUser });
//   } catch (error) {
//     return res.status(400).send({ error: "An error has occurred, unable to delete user" });
//   }
// };

// exports.data = async (req, res) => {
//   return res.json({
//     posts: {
//       title: "User Authentication",
//       description: "random data you can access because you\'re authenticated",
//     },
//   });
// };

const createVendorObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
}
