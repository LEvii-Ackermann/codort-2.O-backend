const express = require("express")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})

const postRouter = express.Router()

const postController = require("../controllers/posts.controller")


/**
 * post api/post 
 * 
 */

postRouter.post("/post", upload.single("profile_image") , postController.postCreateController)

module.exports = postRouter