import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import type { LoginProps } from '../../constants/types'
import { fetchUser } from '../features/user/userSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const {item: userData, error} = useAppSelector(state => state.user)
  const [form, setForm] = useState<LoginProps>({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  
  useEffect(() => {
    if (error) {
      alert(`Invalid Credentials`)
      setForm({...form, password: ''})
    }
  }, [error,dispatch])

  const handleSubmit = async (e: any) => {``
    e.preventDefault()
    try {
      const res = await dispatch(fetchUser(form)).unwrap()
      if (res) {
        alert('User succesfully logged in.')
        navigate('/')
      }
    } catch (error) {
      
    }
    
  }


  return (
    <div className='m-20'>
      <h1 className='ml-10 underline text-4xl'>Login</h1>
     <form onSubmit={handleSubmit}
      className='p-5 bg-gray-100 w-100 flex flex-col gap-5'
     >

      {/* email input */}
        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input type="email" name="email" value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value.toString()})} placeholder='Enter your email'
          className='p-2 bg-white rounded-2xl' required
          />
        </div>

        {/* password input */}
        <div className="flex flex-col gap-2">
          <label>Password:</label>
          <input type="password" name="password" value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value.toString()})} placeholder='Enter your password' 
          className='p-2 bg-white rounded-2xl' required
          />
        </div>

        {/* btn */}
        <button type='submit' className='bg-blue-500 p-2 w-30 ml-20 rounded-2xl'>Submit</button>
        <p>Don't have an account? <Link to='/signup' className='text-blue-600 underline'>SignUp</Link></p>
     </form>
    </div>
  )
}

export default Login
