import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Task from './pages/Task'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register />} />
        <Route path='/' element={ <Home /> } />
        <Route path='/task/new' element={ <Task /> } />
        <Route path='/task/:id' element={ <Task /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
