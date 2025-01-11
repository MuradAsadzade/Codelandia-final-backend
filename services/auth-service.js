const jwt = require("jsonwebtoken");
const AccessToken = require("../utils/AccessToken");
const userService = require("../services/user-service");
const adminService=require("../services/admin-service.js")
const { ErrorResult, SuccessResult } = require("../utils/results");
const bcrypt = require("bcrypt");
const User = require("../models/user/user");
require("dotenv").config();
const pool=require("../config/db.js");
const Admin = require("../models/admin/admin.js");


const loginUser = async (user) => {
  const userExistingResult = await userService.checkDuplicateUsername(user.username);

  if (!userExistingResult[0])
    return new ErrorResult(null, "USER DOES NOT EXIST");

  const passwordCheckResult = await bcrypt.compare(
    user.password,
    userExistingResult[1]
  );

  if (!passwordCheckResult) return new ErrorResult(null,"Incorrect password");

  const token =  jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 1);
  const accessToken = new AccessToken(token, expireDate.toString());
  return new SuccessResult(accessToken,"User logged in successfully");
};

const registerUser = async (username, email, password, password_again) => {
  // Check if the username or email already exists
  const usernameCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (password !== password_again) {
    return new ErrorResult(null, "Passwords do not match");
  };

  if (usernameCheck.rows.length > 0) {
    return  new ErrorResult(null,'Username  already exists');
  }
  if (emailCheck.rows.length > 0) {
    return new ErrorResult(null,'Email  already exists');
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  const user=User.MapOne(result.rows[0]);


  return new SuccessResult(user,"User registered successfully");
}


const loginAdmin = async (admin) => {
  const adminExistingResult = await adminService.checkDuplicateAdminName(admin.username);

  if (!adminExistingResult[0])
    return new ErrorResult(null, "Admin DOES NOT EXIST");

  const passwordCheckResult = await bcrypt.compare(
    admin.password,
    adminExistingResult[1]
  );

  if (!passwordCheckResult) return new ErrorResult(null,"Incorrect password");

  const token =  jwt.sign(
    { username: admin.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 1);
  const accessToken = new AccessToken(token, expireDate.toString());
  return new SuccessResult(accessToken,"Admin logged in successfully");
};


const registerAdmin = async (username, email, password, password_again) => {
  const usernameCheck = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
  const emailCheck = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);

  if (password !== password_again) {
    return new ErrorResult(null, "Passwords do not match");
  };

  if (usernameCheck.rows.length > 0) {
    return  new ErrorResult(null,'Username  already exists');
  }
  if (emailCheck.rows.length > 0) {
    return new ErrorResult(null,'Email  already exists');
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO admins (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  const admin=Admin.MapOne(result.rows[0]);


  return new SuccessResult(admin,"User registered successfully");
}


const getUserProfile = async (username) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return new ErrorResult(null,"User not found");
    }
    return User.MapOne(result.rows[0]); // Assuming you have a MapOne function to format the data
  } catch (error) {
    throw new ErrorResult(null,error.message);
  }
};

const getAdminProfile = async (username) => {
  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      console.log(1);
      return new ErrorResult(null,"Admin not found");
      
    }
    
    return Admin.MapOne(result.rows[0]); // Assuming you have a MapOne function to format the data
  } catch (error) {
    throw new ErrorResult(null,error.message);
  }
};

module.exports = {
  loginUser,
  registerUser,
  loginAdmin,
  registerAdmin,
  getUserProfile,
  getAdminProfile
};
