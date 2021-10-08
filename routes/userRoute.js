const router = require("express").Router();
const userController = require("../controllers/userController");
//const { verifyUser, verifyVendor } = require("../middleware/verifyToken");

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

//router.patch('/:userId', userController.updateUser);

//router.delete('/:userId', userController.deleteUser);

//router.get("/data", verifyUser, userController.data);


router.get("/signup", (req,res)=>{
     res.render("form")
 })

 router.get("/login", (req,res)=>{
    res.render("login")
})


module.exports = router;
