
const express = require("express")

const app = express()

app.use(express.json())     //so that we can make express capable to read req.body

//for temp message 
app.get("/", (req,res) => {
    res.send("hello World")
})


//array to store notes 
const notes = [
    // {
    //     title: "test title 1",                           //dummy notes structure
    //     description: "test description 1"
    // }
]


//POST api so that user can send the notes
app.post("/notes", (req, res) => {
    notes.push(req.body)                      //because in postcss the user will write it in req.body

    res.send("note created")
    console.log(notes);   
})


//GET api so that user can see the notes he created 
app.get("/notes", (req, res) => {
    res.send(notes)
})


//DELETE api used to delete any specific note we will use index 
app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index]

    res.send("note deleted successfully")
})

//PATCH api used to update specific part of note like descrition
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description

    res.send("note updated successfully")
})

module.exports = app