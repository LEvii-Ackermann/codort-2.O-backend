const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, "Follower is required"]
    },
    followe: {
        type: String,
        required: [true, "Followee is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected"
        }
    }
}, {
    timestamps: true
})
followSchema.index({ follower: 1, followe: 1 }, { unique: true })

const followModel = mongoose.model("followers", followSchema)

module.exports = followModel