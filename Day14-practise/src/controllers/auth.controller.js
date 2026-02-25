const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
    const {username, email, password, bio, profile_image} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username: username,
        email: email,
        password: hash,
        bio: bio,
        profile_image: profile_image
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

const loginController = async (req, res) => {
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        return res.status(401).json({
            message: "Password is wrong"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}


module.exports = {
    registerController,
    loginController
}