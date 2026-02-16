const postModel = require('../models/posts.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require("jsonwebtoken")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res) {
    console.log(req.body, req.file)

    const token = req.cookies.jwt_token

    if(!token){
        return res.status(401).json({
            message: "token is not provided. Unauthorized access"
        })
    }

    let decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "user not authorized"
        })                  
    }


    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-backend"
    })  

    const post = await postModel.create({
        caption: req.body.caption,
        image_url: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}

module.exports = {
    createPostController
}