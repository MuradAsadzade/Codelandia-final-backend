const { SuccessResult, ErrorResult } = require("../utils/results.js");
const pool = require("../config/db.js");
const User = require("../models/user/user.js")
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
    let data = await pool.query("SELECT * FROM users where users.deleted=0");
    data = User.MapAll(data.rows);
    if (data.length == 0) {
        return new ErrorResult(null, "No users have been created")
    }
    return new SuccessResult(data, "All users are displayed")
}

const getUserbyId = async (id) => {
    let data = await pool.query("SELECT * FROM users WHERE users.id=$1 and users.deleted=0", [id]);
    data = User.MapOne(data.rows[0]);

    if (data.username == undefined) {
        return new ErrorResult(null, "User was not found")
    }

    return new SuccessResult(data, "User was found");
}

const addNewUser = async (user) => {

    const coded_password = await bcrypt.hash(user.password, 10);
    let new_user = User.MapOne(user);

    let checkName = await checkDuplicateUsername(user.username);
    
    if (checkName[0]) {

        return new ErrorResult(null, "Username has already been used");
    }
    let checkEmail = await checkDuplicateEmail(user.email);
    if (checkEmail) {
        return new ErrorResult(null, "Email has already been taken");
    }

    let data = await pool.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3)", [user.username, user.email, coded_password]);

    return new SuccessResult(new_user, "New user was created");

}

const checkDuplicateUsername = async (username) => {
    let data = await pool.query("SELECT * FROM users WHERE users.username=$1 and users.deleted=0", [username]);
    
    let result = User.MapOne(data.rows[0]);
    let password=result.password;
  

    if (result.username == undefined) {
        console.log(false);

        return false;
    }
    return [true,password];
}

const checkDuplicateEmail = async (email) => {
    let data = await pool.query("SELECT * FROM users WHERE users.email=$1 and users.deleted=0", [email]);
    let result = User.MapOne(data.rows[0]);
    if (result.username == undefined) {
        return false;
    }
    return true;
}


const deleteUser = async (id) => {
    let data = await pool.query("UPDATE users SET deleted=$1 WHERE id=$1 returning *", [id]);
    let result = User.MapOne(data.rows[0]);
    if (data.rows[0] == undefined) {
        return new ErrorResult(null, "User with this id was not found")
    }

    return new SuccessResult(data, "User was deleted successfully")
}

const updateUser=async (id,user)=>{
    let res=await pool.query('UPDATE users SET username=$1,email=$2,password=$3 WHERE id=$4 and deleted=0 returning *',[user.username,user.email,user.password,id]);

    if(res.rows[0]==undefined){
        return new ErrorResult(null,"User was not found");
    }
    let data=User.MapOne(res.rows[0]);
    return new SuccessResult(data,"User was updated")

}



module.exports = {
    getAllUsers,
    getUserbyId,
    addNewUser,
    deleteUser,
    updateUser,
    checkDuplicateUsername,
    checkDuplicateEmail
}