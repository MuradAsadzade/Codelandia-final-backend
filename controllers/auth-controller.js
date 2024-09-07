const User = require("../models/user/user");
const authService = require("../services/auth-service");

const loginUser = async (req, res) => {
  const result = await authService.loginUser(User.MapOne(req.body));
  if (!result.success) res.status(401).json(result);
  else res.status(200).json(result);
};


const registerUser = async (req, res) => {
  const { username, email, password,password_again } = req.body;

  try {
    const user = await authService.registerUser(username, email, password,password_again);
    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}



module.exports = {
  loginUser,
  registerUser
};
