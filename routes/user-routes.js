const express=require("express");
const UserController=require("../controllers/user-controller.js")


const router=express.Router();


router.get("/",UserController.getAllUsers);
router.get("/:id",UserController.getUserbyId);
router.post("/add",UserController.addNewUser);
router.delete("/delete/:id",UserController.deleteUser);
router.put("/update/:id",UserController.updateUser);


module.exports=router;