import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import type { LoginProps } from '../../constants/types'
import { fetchUser } from '../features/user/userSlice'
import { images } from '../../constants/images'
import { Bounce, toast } from 'react-toastify'

const Login = () => {
  const dispatch = useAppDispatch()
  const { item: userData, error } = useAppSelector(state => state.user)
  const [form, setForm] = useState<LoginProps>({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  
  useEffect(() => {
    if (error) {
      setForm({ ...form, password: '' })
    }
  }, [error, dispatch])

  const handleSubmit = async (e: any) => {``
    e.preventDefault()
    try {
      const res = await dispatch(fetchUser(form)).unwrap()
      if (res) {
        toast.success('User successfully logged in...', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          navigate('/');
        }, 1000);
      }

      } catch (err) {
        toast.error(`Invalid Credentials!
            Please try again...`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center mb-6 justify-center">
          <img src={images.bino} alt="" className="w-16" />
          <h1 className="ml-4 font-bold text-3xl text-gray-800 border-b-4 border-blue-500 inline-block">
            Login
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* email input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value.toString() })}
              placeholder="Enter your email"
              className="p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* password input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value.toString() })}
              placeholder="Enter your password"
              className="p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* btn */}
          <button
            type="submit"
            className="bg-blue-500 text-white cursor-pointer p-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Submit
          </button>

          {/* sign up link */}
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
