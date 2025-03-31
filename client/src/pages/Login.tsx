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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Login</h1>
        <form className="mb-3" onSubmit={handleSubmit}>
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        <div className="text-center">
          <button className="btn btn-link" onClick={() => navigate('/register')}>Don't have an account? Register here</button>
        </div>
      </div>
    </div>
  )
}

export default Login
