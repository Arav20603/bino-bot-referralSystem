import React, { useEffect, useState } from 'react'
import type { CreateUserProps } from '../../constants/types'
import { useAppDispatch, useAppSelector } from '../hooks'
import {Link, useNavigate} from 'react-router-dom'
import { createUser } from '../features/user/userSlice'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState<CreateUserProps>({
    name: '', email: '', password: '', referrerLink: null
  })



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await dispatch(createUser(form)).unwrap()
      alert('User Created successfully')
      navigate('/login')
    } catch (err: any) {
      alert(`Error is creating user: ${err.message || err}`)
      setForm({...form, password: ''})
    }
  }

  return (
    <div className='m-20'>
      <h1 className='ml-10 underline text-4xl'>Signup</h1>
     <form onSubmit={handleSubmit}
      className='p-5 bg-gray-100 w-100 flex flex-col gap-5'
     >

      {/* name input */}
        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input type="text" name="name" value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value.toString()})} placeholder='Enter your email'
          className='p-2 bg-white rounded-2xl' required
          />
        </div>

      {/* email input */}
        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input type="email" name="email" value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value.toString()})} placeholder='Enter your email'
          className='p-2 bg-white rounded-2xl' required
          />
        </div>

        {/* referral code input */}
        <div className="flex flex-col gap-2">
          <label>Referral Link:</label>
          <input type="text" name="phoneNo" value={form.referrerLink ?? ''}
          onChange={(e) => setForm({...form, referrerLink: e.target.value})} 
          className='p-2 bg-white rounded-2xl'
          />
        </div>

        {/* password input */}
        <div className="flex flex-col gap-2">
          <label>Password:</label>
          <input type="text" name="password" value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value.toString()})} placeholder='Enter your password' 
          className='p-2 bg-white rounded-2xl' required
          />
          <p className='text-xs text-gray-500'>Minimum 10 characters, atleast 1 Uppercase and 1 Lowercase, 1 special characters @,#,$,%,etc</p>
        </div>

        {/* btn */}
        <button type='submit' className='bg-blue-500 p-2 w-30 ml-20 rounded-2xl'>Signup</button>
        <p>Already have an account? <Link to='/login' className='text-blue-500 underline'>Login</Link></p>
     </form>
    </div>
  )
}

export default SignUp