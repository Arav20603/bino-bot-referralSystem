import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { images } from '../../constants/images'

const Home = () => {
  const [user, setUser] = useState({
      name: '', email: '', referrals: 0, rewards: 0
    })
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user === null) {
      navigate('/login')
    } else setUser(JSON.parse(user))
  }, [])
  return (
    <div className='font-mono pt-40 min-h-screen bg-blue-50 flex items-center flex-col justify-center'>
      <Navbar />

      <h1 className='text-7xl font-semibold m-5 font-mono'>Hi, {user.name.toUpperCase()}!</h1>
        {/* Referral and reward card */}
      <div className="bg-white w-1/4 h-100 rounded-4xl shadow-xl">
        {/* Referrals */}
        <div className="flex items-center flex-col mt-10">
          <h1 className='text-2xl font-semibold font-mono'>Total Referals</h1>
          <div className="flex flex-row gap-5 items-center justify-center mt-5">
            <img src={images.referral} alt="" className='w-15 h-15' />
            <p className='p-3 text-4xl rounded-full text-center'>
              {user.referrals || 0}</p>
          </div>
        </div>

        {/* Rewards earned */}
        <div className="flex items-center flex-col mt-10">
          <h1 className='text-2xl font-semibold font-mono'>Points earned</h1>
          <div className="flex flex-row gap-5 items-center justify-center mt-5">
            <img src={images.coin} alt="" className='w-15 h-15' />
            <p className='p-3 text-4xl rounded-full text-center'>
              {user.rewards || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
