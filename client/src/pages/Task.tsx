import React, { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import './Task.css'

function Task(){
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const passedTask = id ? location.state?.task : null

  const [title, setTitle] = useState(passedTask?.title || 'Title')
  const [content, setContent] = useState(passedTask?.content || 'Content')
  const [completeBy, setCompleteBy] = useState(passedTask?.completeBy ? new Date(passedTask.completeBy).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(title.length < 1){
      alert('Title is needed')
      return
    }

    if(!completeBy){
      alert('Complete by date is needed')
      return
    }

    try{
      if(id){
        await axios.post(`http://localhost:5000/api/tasks/edit/${id}`, { _id: id, title: title, content: content, completeBy: completeBy, updatedDate: Date.now() }, { withCredentials: true })
        alert('Task modified')
        console.log('task modified')
      }
      else{
        await axios.post('http://localhost:5000/api/tasks/add', { title: title, content: content, completeBy: completeBy }, { withCredentials: true })
        alert('New task added')
        console.log('new task added')
      }
      navigate('/')
    }
    catch (error: any) {
      if(id){
        console.error('error editing task: ', error)
        alert(`Error editing task: ${error}`)
      }
      else{
        console.error('error creating task: ', error)
        alert(`Error creating task: ${error}`)
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 className="text-center mb-4">{id ? 'Edit Task' : 'New Task'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="task-title" className="form-label">Task Title</label>
            <input
              id="task-title"
              className="form-control"
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="task-content" className="form-label">Task Details</label>
            <input
              id="task-content"
              className="form-control"
              type="text"
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="task-complete-by" className="form-label">Task Complete By Date</label>
            <input
              id="task-complete-by"
              className="form-control"
              type="date"
              value={completeBy}
              onChange={e => setCompleteBy(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">{id ? 'Edit Task' : 'Add Task'}</button>
        </form>
        <button className="btn btn-link mt-3 w-100" onClick={() => navigate('/')}>Go Back</button>
      </div>
    </div>
  )
}

export default Task
