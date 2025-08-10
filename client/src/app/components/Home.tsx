import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Home = () => {
  const [user, setUser] = useState({
      name: '', email: ''
    })
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user === null) {
      navigate('/login')
    }
    
  })
  return (
    <div className='pt-40 min-h-screen bg-blue-50'>
      <Navbar />
    </div>
  )
}

export default Home
