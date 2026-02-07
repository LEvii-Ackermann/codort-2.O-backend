/**
 * create a server
 * create server config.
 */

const express = require("express")
const noteModel = require("./models/notes.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

/**
 * POST /api/notes
 * create new note and save data in mongoDB
 */
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

/**
 * GET /api/notes
 * get all the notes from mongoDB
 */
app.get("/api/notes",async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

/**
 * DELETE /api/notes
 * delete a note by id
 */
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id

    const deletedNote = await noteModel.findByIdAndDelete(id)

  if (!deletedNote) {
    return res.status(404).json({
      message: "Note not found"
    })
  }

  res.status(200).json({
    message: "Note deleted successfully",
    deletedNote
  })
})

/**
 * PATCH /api/notes
 * path to modify existing user
 */

app.patch("/api/notes/:id", async (req, res) => {

    const id = req.params.id
    const { description } = req.body
    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
     message: "Note updated successfully"
    })
})

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..", "/public/index.html"))
})

module.exports = app