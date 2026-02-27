const express = require("express")
const followController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/**
 * post  /api/users/follow/:username
 * @description api to follow someone give the username of user you want to follow in the params
 */
userRouter.post("/follow/:username", identifyUser ,followController.followRequestController)

userRouter.patch("/follow/accept/:username", identifyUser, followController.acceptedRequestController)

userRouter.patch("/follow/reject/:username", identifyUser, followController.rejectedRequestController)

/**
 * post /api/users/unfollow/:username
 * @description api to unfollow someone
 */
userRouter.post("/unfollow/:username", identifyUser, followController.unfollowUserController)

module.exports = userRouter