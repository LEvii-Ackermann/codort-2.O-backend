const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followRequestController(req, res) {
  const followerUsername = req.user.username;
  const followeUsername = req.params.username;

  if (followeUsername === followerUsername) {
    return res.status(400).json({
      message: "you can't follow yourself",
    });
  }

  const isUserExist = await userModel.findOne({
    username: followeUsername,
  });
  if (!isUserExist) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    followe: followeUsername,
    follower: followerUsername,
  });

  if (isAlreadyFollowing) {
    if (isAlreadyFollowing.status === "pending") {
      return res.status(400).json({
        message: "Follow request already sent",
      });
    }

    if (isAlreadyFollowing.status === "accepted") {
      return res.status(400).json({
        message: "You are already following this user",
      });
    }

    if (isAlreadyFollowing.status === "rejected") {
      isAlreadyFollowing.status = "pending";
      await isAlreadyFollowing.save();

      return res.status(200).json({
        message: "Follow request sent again",
        isAlreadyFollowing,
      });
    }
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followe: followeUsername,
  });

  res.status(201).json({
    message: `the follow request has been sent`,
    followRecord,
  });
}

async function acceptedRequestController(req, res) {
  const follower = req.params.username; //sender
  const followe = req.user.username; //receiver

  const request = await followModel.findOne({
    follower: follower,
    followe: followe,
    status: "pending",
  });

  if (!request) {
    return res.status(404).json({
      message: "The Request is not available",
    });
  }

  request.status = "accepted";
  await request.save();

  res.status(200).json({
    message: "The follow request has been accepted",
    request,
  });
}

async function rejectedRequestController(req, res) {
  const follower = req.params.username;
  const followe = req.user.username;

  const request = await followModel.findOneAndUpdate(
    { follower: follower, followe: followe, status: "pending" },
    { status: "rejected" },
    { new: true },
  );

  if (!request) {
    return res.status(404).json({
      message: "The request is not available",
    });
  }

  res.status(200).json({
    message: "The request has been rejected",
    request,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeUsername = req.params.username;

  const isUserExist = await userModel.findOne({
    username: followeUsername,
  });
  if (!isUserExist) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followe: followeUsername,
    status: "accepted",
  });
  if (!isUserFollowing) {
    return res.status(200).json({
      message: "you are not following him",
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `you have unfollowed ${followeUsername}`,
  });
}

module.exports = {
  followRequestController,
  unfollowUserController,
  acceptedRequestController,
  rejectedRequestController,
};
