const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const {name, email, password} = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })
    if(isUserAlreadyExist){
        return res.status(401).json({
            message: "user already exists with this email"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            name: user.name
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt-token", token)

    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    })
})


authRouter.post("/login", async (req, res) => {
    const { email , password } = req.body

    const user = await userModel.findOne({ email })

    if(!user){
        res.status(404).json({
            message: "User not found with this email address"
        })
    }

    const validPassword = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!validPassword){
        res.status(404).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt-token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user
    })
})


module.exports = authRouter