const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerController (req, res) {

    const {username, email, password, bio, profile_image} = req.body

    /**
     * first check the username and duplicate should not be used before
     */

    const isUserExist = await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })

    if(isUserExist){
        return res.status(409)
            .json({
                message: "User already exists" + (isUserExist.username == username
                ? "Username already exists": "email already exists")
            })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profile_image,
        password:hash
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("jwt-token", token)

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

async function loginController (req, res) {

    const {username, email, password} = req.body


    const user = await userModel.findOne({
        $or:[
            {
                username:username 
            },
            {
                email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "User not exist" 
        })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if(!validPassword){
        return res.status(409).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user logged in successfully",
        user:{
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
