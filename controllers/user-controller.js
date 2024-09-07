
const { get } = require("../routes");
const UserService=require("../services/user-service.js")


const getAllUsers=async (req,res)=>{
    const users=await UserService.getAllUsers();
    res.json(users);
}

const getUserbyId=async(req,res)=>{
    const users=await UserService.getUserbyId(req.params.id);
    res.json(users);
}

const addNewUser=async(req,res)=>{
    const user=await UserService.addNewUser(req.body);
    res.json(user);
}

const deleteUser=async (req,res)=>{
    const user=await UserService.deleteUser(req.params.id);
    res.json(user);
}

const updateUser=async(req,res)=>{
    const user=await UserService.updateUser(req.params.id,req.body);
    res.json(user);
}


module.exports={
    getAllUsers,
    getUserbyId,
    addNewUser,
    deleteUser,
    updateUser
}