const User = require("../models/user/user");
const Admin = require("../models/admin/admin");
const authService = require("../services/auth-service");
const authenticateUser = require("../middleware/auth");

// User login
const loginUser = async (req, res) => {
  const result = await authService.loginUser(User.MapOne(req.body));
  if (!result.success) {
    res.status(401).json(result);
  } else {
    res.status(200).json(result);
  }
};

// User registration
const registerUser = async (req, res) => {
  const { username, email, password, password_again } = req.body;

  try {
    const user = await authService.registerUser(username, email, password, password_again);
    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  const result = await authService.loginAdmin(Admin.MapOne(req.body));
  if (!result.success) {
    res.status(401).json(result);
  } else {
    res.status(200).json(result);
  }
};

// Admin registration
const registerAdmin = async (req, res) => {
  const { username, email, password, password_again } = req.body;

  try {
    const admin = await authService.registerAdmin(username, email, password, password_again);
    res.status(201).json({
      message: 'Admin registered successfully',
      admin,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Protected route example: Get user profile (requires authentication)
const getUserProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.username); // Use req.user set by authenticateUser
    if (!user) {
      console.log("Murad");
      
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAdminProfile = async (req, res) => {
  try {
    const user = await authService.getAdminProfile(req.admin.username); // Use req.user set by authenticateUser
    console.log(req.admin);
    
    console.log(user);
    
    if (!user) {
      console.log("Murad");
      
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
