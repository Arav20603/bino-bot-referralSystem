import React, { useState } from 'react';
import type { CreateUserProps } from '../../constants/types';
import { useAppDispatch } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../features/user/userSlice';
import { images } from '../../constants/images';
import { Bounce, toast } from 'react-toastify';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateUserProps>({
    name: '',
    email: '',
    password: '',
    referrerLink: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(createUser(form)).unwrap();
      if (result) {
        toast.success('User created successfully', {
          position: 'top-center',
          autoClose: 2000,
          transition: Bounce,
        });
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch {
      toast.error(`Error in creating user! Please try again...`, {
        position: 'top-center',
        autoClose: 2000,
        transition: Bounce,
      });
      setForm({ ...form, password: '' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        
        {/* Header */}
        <div className="flex flex-row sm:flex-row items-center sm:items-end justify-center gap-3 mb-6">
          <img src={images.bino} alt="Logo" className="w-14 sm:w-16" />
          <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 border-b-4 border-blue-500">
            Sign Up
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
              className="p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
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

          {/* Referral */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Referral Link:</label>
            <input
              type="text"
              value={form.referrerLink ?? ''}
              onChange={(e) => setForm({ ...form, referrerLink: e.target.value })}
              placeholder="Enter referral link (optional)"
              className="p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
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
            <p className="text-xs text-gray-500">
              Minimum 8 characters, at least 1 uppercase, 1 lowercase, and 1 special character (@, #, $, %, etc.)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
