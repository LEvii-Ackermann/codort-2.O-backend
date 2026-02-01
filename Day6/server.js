const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://navedhasan1704_db_user:levisAKHKJCeaQ6j@cluster0.twvqyws.mongodb.net/day-6")
    .then(() => {
        console.log("Connected to Database");
    })
} 
connectToDb()

app.listen(3000, () => {
    console.log("the server is running on port 3000");
})

