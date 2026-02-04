import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      const data = res.data.notes;
      setNotes(data);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/notes", {
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res.data);

        setTitle("")
        setDescription("")
        fetchNotes();
      });

  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/"+noteId)
      .then(res => {
        console.log(res.data)

        fetchNotes()
      })
  }



  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <form className="noteCreateForm" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title"
          type="text"
          placeholder="Enter Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description"
          type="text"
          placeholder="Enter description"
        />
        <button className="createNote">Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button
              onClick={() => {
                handleDeleteNote(note._id);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
