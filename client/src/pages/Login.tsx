import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'

function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
    const { data } = await axios.post('http://localhost:5000/api/users/login', {
      username: username,
      password: password
    }, {
      withCredentials: true
    })
    console.log('logged in: ', data)

    navigate('/')
    } catch (error: any) {
      alert('Either username or password are incorrect')
      console.error('error logging in: ', error)
    }
  }

  return (
    <div className='login-div'>
      <h1>Login Page</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <input 
          className='login-username-field'
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> 
        <input 
          className='login-password-field'
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login-submit-button' type='submit'>Login</button>
      </form>
      <button className='login-switch-button' onClick={() => navigate('/register')}>Need have an account?</button>
    </div>
  )
}

export default Login
