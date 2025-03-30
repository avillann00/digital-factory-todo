import './Home.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home(){
  const navigate = useNavigate()
  const [data, setData] = useState<User>()

  interface Task{
    _id: string
    title: string
    content: string
    completeBy: string
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

  const handleDelete = async (task: Task) => {
    try{
      await axios.delete(`http://localhost:5000/api/tasks/delete/${task._id}`, { withCredentials: true })
      setData(prevData => {
        if (!prevData) return undefined

        return {
          ...prevData,
          tasks: prevData.tasks.filter(t => t._id !== task._id)
        }
      })  
      alert('Task deleted')
    }
    catch (e) {
      console.log('error deleting task: ', e)
      alert(`Error deleting task: ${e}`)
    }
  }

  const handleModify = async (task: Task) => {
    navigate(`/task/${task._id}`, { state: { task } })
  }

  const handleAdd = async () => {
    navigate('/task/new')
  }

  const tasks = data?.tasks?.map((task) => (
    <li className='task-list-element' key={task._id}>
      <h3>{task.title}</h3>
      <p>{task.content}</p>
      <h3>Complete by: {task.completeBy.slice(0, 10)}</h3>
      <button onClick={() => handleModify(task)}>Modify</button>
      <button onClick={() => handleDelete(task)}>Delete</button>
    </li>
  ))

  return (
    <div className='home-div'>
      <h1>Home page</h1>
      <h1>{data?.username ? `Hello ${data.username}` : 'Welcome'}</h1>
      <button onClick={handleAdd}>Add task</button>
      <h1>Tasks:</h1>
      <ul className='task-list'>
        {tasks}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
