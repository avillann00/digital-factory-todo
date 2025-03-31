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
      await axios.post('http://localhost:5000/api/users/register', {
        username: username,
        email: email,
        password: password
      }, {
        withCredentials: true
      })
      alert('Registered')

      navigate('/login')
    } catch (error: any) {
      alert('There was an error with your registration')
      console.error('error logging in: ', error)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input 
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input 
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input 
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">Register</button>
        </form>
        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={() => navigate('/login')}>Already have an account? Login here</button>
        </div>
      </div>
    </div>
  )
}

export default Register
