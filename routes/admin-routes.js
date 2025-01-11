const express=require("express");
const AdminController=require("../controllers/admin-controller.js")


const router=express.Router();


router.get("/",AdminController.getAllAdmins);
router.get("/:id",AdminController.getAdminbyId);
router.post("/add",AdminController.addNewAdmin);
router.delete("/delete/:id",AdminController.deleteAdmin);
router.put("/update/:id",AdminController.updateAdmin);


module.exports=router;