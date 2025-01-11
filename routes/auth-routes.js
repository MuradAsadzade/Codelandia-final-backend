const authController = require("../controllers/auth-controller");
const express = require("express");
const authenticateUser = require('../middleware/auth');

const router = express.Router();

router.post("/user/login", authController.loginUser);
router.post("/user/register",authController.registerUser);
router.post("/admin/login", authController.loginAdmin);
router.post("/admin/register",authController.registerAdmin);
// Protected route (requires authentication)
router.get('/user/profile', authenticateUser.authenticateUser, authController.getUserProfile);
router.get('/admin/profile', authenticateUser.authenticateAdmin, authController.getAdminProfile);

module.exports = router;
