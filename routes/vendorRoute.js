const router = require("express").Router();
const vendorController = require("../controllers/vendorController");
//const { verifyUser, verifyVendor } = require("../middleware/verifyToken");

router.post("/signup", vendorController.signUp);

router.post("/login", vendorController.logIn);

//router.patch('/:userId', vendorController.updateVendor);

//router.delete('/:userId', userController.deleteUser);

//router.get("/data", verifyUser, vendorController.data);

router.get("/signup", (req,res)=>{
    res.render("signup-vendor")
})

router.get("/login", (req,res)=>{
   res.render("login-vendor")
})


module.exports = router;
