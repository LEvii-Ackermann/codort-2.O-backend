const postModel = require("../models/posts.model")
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


const postCreateController = async (req, res) => {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token is not provided. Unauthorized access"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "User not authorized"
        })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-practise"
    })  
    
    const post = await postModel.create({
        caption: req.body.caption,
        profile_url: file.url,
        userId: decoded.id
    })

    res.status(201).json({
        message: "post created successsfully",
        post
    })

}

module.exports = {
    postCreateController
}