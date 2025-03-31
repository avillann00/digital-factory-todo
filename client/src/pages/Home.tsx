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
    <li className="list-group-item d-flex justify-content-between align-items-center" key={task._id}>
      <div>
        <h5>{task.title}</h5>
        <p>{task.content}</p>
        <small>Complete by: {task.completeBy.slice(0, 10)}</small>
      </div>
      <div>
        <button className="btn btn-warning btn-sm me-2" onClick={() => handleModify(task)}>Modify</button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task)}>Delete</button>
      </div>
    </li>
  ))

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Home page</h1>
      <h1 className='text-center'>{data?.username ? `Hello ${data.username}` : 'Welcome'}</h1>
      <button className='btn btn-primary mx-auto d-block' onClick={handleAdd}>Add task</button>
      <h1 className='text-center'>Tasks:</h1>
      <ul className='list-group mb-4'>
        {tasks}
      </ul>
      <button className='btn btn-danger w-100' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
