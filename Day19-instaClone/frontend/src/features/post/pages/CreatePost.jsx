import React, { useState, useRef } from "react";
import "../styles/createPost.scss"
import { usePost } from "../hooks/usePost";
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)

    const navigate = useNavigate()

    const { loading, handleCreatePost} = usePost()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]
        await handleCreatePost(file, caption)

        navigate('/')
    }

    if(loading){
        return (
            <main>
                <h1>Creating post</h1>
            </main>
        )
    }

  return (
    <main>
      <div className="create-post">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="post-image" className="post-image-label">choose image</label>  
          <input ref={postImageInputFieldRef} type="file" hidden name="post-image" id="post-image" />
          <input value={caption} onChange={(e) => {setCaption(e.target.value)}} type="text" name="caption" className="caption" placeholder="enter caption"/>
          <button className="create-post-button">create post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
