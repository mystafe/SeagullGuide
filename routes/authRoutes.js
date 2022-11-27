const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/no", authController.get_noAuth);
router.get("/verification", authController.get_verification);
router.post("/verification", authController.post_verification);
router.get("/user/verify/", authController.VerifyUserWithToken);
router.post("/login", authController.post_login);
router.get("/login", authController.get_login);
router.get("/logout", authController.get_logout);
router.get("/register", authController.get_register);
router.post("/register", authController.post_register);
router.get("/forget-password", authController.get_password);
router.post("/forget-password", authController.post_password);

module.exports = router;
