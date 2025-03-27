import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Register.css'

function Register(){
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!username || !email || !password || !confirmPassword){
      alert('All fields are required')
      return
    }

    if(password !== confirmPassword){
      alert('Passwords do not match')
      console.error('Passwords do not match')
      return
    }

    try {
      alert('posting now')
      await axios.post('http://localhost:5000/api/users/register', {
        username: username,
        email: email,
        password: password
      }, {
        withCredentials: true
      })
      alert('post post')

      navigate('/login')
    } catch (error: any) {
      console.error('error logging in: ', error)
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form className='register-form' onSubmit={handleSubmit}>
        <input 
          className='register-username-field'
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />  
        <input 
          className='register-email-field'
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> 
        <input 
          className='register-password-field'
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> 
        <input 
          className='register-confirm-password-field'
          type='password'
          placeholder='confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className='register-submit-button' type='submit'>Register</button>
      </form>
      <button className='register-switch-button' onClick={() => navigate('/login')}>Already have an account?</button>
    </div>
  )
}

export default Register
