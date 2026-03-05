const postModel = require('../models/posts.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const likeModel = require('../models/like.model')

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

    console.log(req.file)
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

async function likePostController (req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: username
    })
    if(isAlreadyLiked){
        return res.status(200).json({
            message: "you already have liked the post"
        })
    }

    const likeDetail = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "post liked successfully",
        likeDetail
    })
}

async function unlikePostController (req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const isLiked = await likeModel.findOne({
        user: username,
        post: postId
    })

    if(!isLiked){
        return res.status(200).json({
            message: "you have not liked the post"
        })
    }

    await likeModel.findByIdAndDelete(isLiked._id)

    res.status(200).json({
        message: "post disliked successfully"
    })
}


async function getPostFeedController(req, res) {

    const user = req.user

    const posts = await Promise.all(
        (await postModel.find().populate("user").lean())
            .map(async (post) => {

                const isLiked = await likeModel.findOne({
                    user: user.username,
                    post: post._id
                })

                post.isLiked = Boolean(isLiked)

                return post
            })
    )

    res.status(200).json({
        message: "All posts",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostByIdController,
    likePostController,
    getPostFeedController,
    unlikePostController
}