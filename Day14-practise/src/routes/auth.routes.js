const express = require("express")

const authRouter = express.Router()

const authController = require("../controllers/auth.controller")

/**
 * Register 
 * api/auth/register
 */
authRouter.post("/register", authController.registerController)

/**
 * Login
 * api/auth/login
 */
authRouter.post("/login", authController.loginController)

module.exports = authRouter
