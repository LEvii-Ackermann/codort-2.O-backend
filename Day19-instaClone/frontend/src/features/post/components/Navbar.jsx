import React from 'react'
import "../styles/feed.scss"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <>
        <div className="nav">
            <p>
                Insta
            </p>
            <button onClick={() => {navigate("/create-post")}}>
                new post
            </button>
        </div>
    </>
  )
}

export default Navbar