import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { LoginProps } from '../../constants/types';
import { fetchUser } from '../features/user/userSlice';
import { images } from '../../constants/images';
import { Bounce, toast } from 'react-toastify';

const Login = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);
  const [form, setForm] = useState<LoginProps>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setForm((prev) => ({ ...prev, password: '' }));
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(fetchUser(form)).unwrap();
      if (res) {
        toast.success('User successfully logged in...', {
          position: 'top-center',
          autoClose: 2000,
          transition: Bounce,
        });

        setTimeout(() => navigate('/'), 1000);
      }
    } catch {
      toast.error(`Invalid Credentials! Please try again...`, {
        position: 'top-center',
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        
        {/* Header */}
        <div className="flex flex-row sm:flex-row items-center sm:items-end justify-center mb-6 gap-3">
          <img src={images.bino} alt="Logo" className="w-14 sm:w-16" />
          <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 border-b-4 border-blue-500">
            Login
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Submit
          </button>

          {/* Signup link */}
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
