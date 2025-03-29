import './Home.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home(){
  const navigate = useNavigate()
  const [data, setData] = useState<User>()

  interface Task{
    _id: number
    title: string
    content: string
  }

  interface User{
    username: string
    tasks: Task[]
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', { withCredentials : true })
        setData(response.data)
      }
      catch (error: any) {
        if(error.response && error.response.status === 401){
          alert('Not logged in')
          console.error('Not logged in: ', error)
          navigate('/login')
        }
        else{
          console.error('error getting tasks')
          alert(`Error getting tasks: ${error}`)
        }
      }
    }

    fetchTasks()
  }, [navigate])

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true })
    console.log('logged out')
    alert('Logged out')
    navigate('/login')
  }

  const tasks = data?.tasks?.map((task) => (
    <li key={task._id}>
      <h3>{task.title}</h3>
      <p>{task.content}</p>
    </li>
  ))

  return (
    <div className='home-div'>
      <h1>Home page</h1>
      <h1>{data?.username ? `Hello ${data.username}` : 'Welcome'}</h1>
      <h1>Tasks:</h1>
      <ul>
        {tasks}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
