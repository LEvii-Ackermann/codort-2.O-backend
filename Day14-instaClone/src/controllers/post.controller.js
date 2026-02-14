const postModel = require('../models/posts.model')


async function createPostController (req, res) {
    console.log(req.body, req.file)
}

module.exports = {
    createPostController
}