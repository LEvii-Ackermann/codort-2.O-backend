import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { handleLogin, loading } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    if(loading){
        return (
            <h1>
                Loading...
            </h1>
        )
    }

    async function handleSubmit (e) {
        e.preventDefault()

        try {
            await handleLogin( username, password )
            console.log('user logged in')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    onInput={(e) => {setUsername(e.target.value)}}
                    type="text" 
                    name='username' 
                    placeholder='Enter username' 
                />
                <input 
                    onInput={(e) => {setPassword(e.target.value)}}
                    type="password" 
                    name='password' 
                    placeholder='Enter password' 
                />
                <button>
                    Login
                </button>
            </form>
            <p>
                Don't have an account? <Link className='register_tag' to="/register">Register</Link>
            </p>
        </div>
    </main>
  )
}

export default Login