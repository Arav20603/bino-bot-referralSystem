import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './app/components/Home'
import Login from './app/pages/Login'
import SignUp from './app/pages/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
