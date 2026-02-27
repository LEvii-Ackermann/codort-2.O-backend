import React, { useState } from 'react'
import "../style/form.scss"
import axios from 'axios'

const Register = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit (e) {
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/register", {
      email,
      username,
      password
    }, {
      withCredentials: true
    })
    .then(res => {
      console.log(res.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
            onInput={(e) => { setEmail(e.target.value) }}
            value={email}
            type="text"
            name='email' 
            placeholder='Enter email'
          />
          <input 
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username' 
            placeholder='Enter username'
          />
          <input 
            onInput={(e) => { setPassword(e.target.value) }}
            type="password"
            name='password' 
            placeholder='Enter password'
          />
          <button>
            Register
          </button>
        </form>
      </div>
    </main>
  )
}

export default Register