const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController (req, res) {
    const followerUsername = req.user.username
    const followeUsername = req.params.username

    if(followeUsername === followerUsername){
        return res.status(400).json({
            message: "you can't follow yourself"
        })
    }

    const isUserExist = await userModel.findOne({
        username: followeUsername
    })
    if(!isUserExist){
        return res.status(404).json({
            message: "User does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        followe: followeUsername,
        follower: followerUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message: "You are already following him"
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followe: followeUsername
    })

    res.status(201).json({
        message: `you are now following ${followeUsername}`,
        follow: followRecord
    })
}



async function unfollowUserController (req, res) {
    const followerUsername = req.user.username
    const followeUsername = req.params.username

    const isUserExist = await userModel.findOne({
        username: followeUsername
    })
    if(!isUserExist){
        return res.status(404).json({
            message: "User does not exist"
        })
    }

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followe: followeUsername
    })
    if(!isUserFollowing){
        return res.status(200).json({
            message: "you are not following him"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `you have unfollowed ${followeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}