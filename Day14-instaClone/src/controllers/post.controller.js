const postModel = require('../models/posts.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res) {
    
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-backend"
    })  

    const post = await postModel.create({
        caption: req.body.caption,
        image_url: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}

async function getPostController (req, res) {

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "All posts",
        posts
    })
}

async function getPostByIdController (req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}



module.exports = {
    createPostController,
    getPostController,
    getPostByIdController
}