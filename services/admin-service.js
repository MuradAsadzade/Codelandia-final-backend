const { SuccessResult, ErrorResult } = require("../utils/results.js");
const pool = require("../config/db.js");
const Admin = require("../models/admin/admin.js")
const bcrypt = require("bcrypt");

const getAllAdmins = async () => {
    let data = await pool.query("SELECT * FROM admins where admins.deleted=0 ORDER BY id");
    data = Admin.MapAll(data.rows);
    if (data.length == 0) {
        return new ErrorResult(null, "No Admins have been created")
    }
    return new SuccessResult(data, "All Admins are displayed")
}

const getAdminbyId = async (id) => {
    let data = await pool.query("SELECT * FROM admins WHERE admins.id=$1 and admins.deleted=0", [id]);
    
    data = Admin.MapOne(data.rows[0]);
    console.log(data);
    

    if (data.username === undefined) {
        return new ErrorResult(null, "Admin was not found")
    }

    return new SuccessResult(data, "Admin was found");
}

const addNewAdmin = async (admin) => {

    const coded_password = await bcrypt.hash(admin.password, 10);
    let new_Admin = Admin.MapOne(admin);

    let checkName = await checkDuplicateAdminName(admin.username);
    
    if (checkName[0]) {

        return new ErrorResult(null, "Adminname has already been used");
    }
    let checkEmail = await checkDuplicateEmail(admin.email);
    if (checkEmail) {
        return new ErrorResult(null, "Email has already been taken");
    }

    let data = await pool.query("INSERT INTO admins(username,email,password) VALUES($1,$2,$3)", [admin.username, admin.email, coded_password]);

    return new SuccessResult(new_Admin, "New Admin was created");

}

const checkDuplicateAdminName = async (username) => {
    let data = await pool.query("SELECT * FROM admins WHERE admins.username=$1 and admins.deleted=0", [username]);
    
    let result = Admin.MapOne(data.rows[0]);
    let password=result.password;
  

    if (result.username == undefined) {
        console.log(false);

        return false;
    }
    return [true,password];
}

const checkDuplicateEmail = async (email) => {
    let data = await pool.query("SELECT * FROM admins WHERE admins.email=$1 and Admins.deleted=0", [email]);
    let result = Admin.MapOne(data.rows[0]);
    if (result.username == undefined) {
        return false;
    }
    return true;
}


const deleteAdmin = async (id) => {
    let data = await pool.query("UPDATE admins SET deleted=$1 WHERE id=$1 returning *", [id]);
    let result = Admin.MapOne(data.rows[0]);
    if (data.rows[0] == undefined) {
        return new ErrorResult(null, "Admin with this id was not found")
    }

    return new SuccessResult(result, "Admin was deleted successfully")
}

const updateAdmin=async (id,admin)=>{
    let res=await pool.query('UPDATE admins SET username=$1,email=$2,password=$3 WHERE id=$4 and deleted=0 returning *',[admin.username,admin.email,admin.password,id]);

    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Admin was not found");
    }
    let data=Admin.MapOne(res.rows[0]);
    return new SuccessResult(data,"Admin was updated")

}



module.exports = {
    getAllAdmins,
    getAdminbyId,
    addNewAdmin,
    deleteAdmin,
    updateAdmin,
    checkDuplicateAdminName,
    checkDuplicateEmail
}