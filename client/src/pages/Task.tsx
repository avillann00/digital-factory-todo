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
    <div className='task-div'>
      <h1>Task form</h1>
      <h1>{id ? 'Edit Task' : 'New Task'}</h1>
      <form className='task-form' onSubmit={handleSubmit}>
        <div>Task Title</div>
        <input
          className='task-title-field'
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        /> 
        <div>Task Details</div>
        <input
          className='task-content-field'
          type='text'
          placeholder='Content'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div>Task Complete By Date</div>
        <input
          className='task-complete-by-field'
          type='date'
          value={completeBy}
          onChange={e => setCompleteBy(e.target.value)}
        />
        <button type='submit'>{id ? 'Edit Task' : 'Add task'}</button>
      </form>
      <button onClick={() => navigate('/')}>Go back</button>
    </div>
  )
}

export default Task
