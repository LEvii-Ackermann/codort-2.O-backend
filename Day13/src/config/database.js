const mongoose = require("mongoose")

const connectToDB = () => {
    mongoose.connect(process.env.MongoDB_URI)
    .then(() => {
        console.log("database is connected")
    })
}

module.exports = connectToDB