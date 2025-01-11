
const { get } = require("../routes");
const AdminService=require("../services/admin-service.js");
const { getUserbyId } = require("./user-controller.js");


const getAllAdmins=async (req,res)=>{
    const admins=await AdminService.getAllAdmins();
    res.json(admins);
}

const getAdminbyId=async(req,res)=>{
    const admin=await AdminService.getAdminbyId(req.params.id);
    res.json(admin);
}

const addNewAdmin=async(req,res)=>{
    const admin=await AdminService.addNewAdmin(req.body);
    res.json(admin);
}

const deleteAdmin=async (req,res)=>{
    const admin=await AdminService.deleteAdmin(req.params.id);
    res.json(admin);
}

const updateAdmin=async(req,res)=>{
    const admin=await AdminService.updateAdmin(req.params.id,req.body);
    res.json(admin);
}

module.exports={
    getAllAdmins,
    getAdminbyId,
    addNewAdmin,
    deleteAdmin,
    updateAdmin
}