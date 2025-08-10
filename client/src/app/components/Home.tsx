import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/login')
    }
  })
  return (
    <div>
      Welcome User!
    </div>
  )
}

export default Home
