import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { images } from '../../constants/images';

const Home = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    referrals: 0,
    rewards: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="font-mono min-h-screen bg-blue-50 flex flex-col items-center">
      <Navbar />

      {/* Greeting */}
      <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold mt-28 sm:mt-36 mb-6 text-center">
        Hi, {user.name?.toUpperCase() || 'Guest'}!
      </h1>

      {/* Referral and reward card */}
      <div className="bg-white w-[90%] sm:w-2/3 lg:w-1/3 rounded-3xl shadow-xl p-6 sm:p-10 space-y-10">
        
        {/* Referrals */}
        <div className="flex flex-col items-center">
          <h1 className="text-lg sm:text-2xl font-semibold">Total Referrals</h1>
          <div className="flex items-center justify-center gap-4 sm:gap-5 mt-4">
            <img src={images.referral} alt="" className="w-10 h-10 sm:w-14 sm:h-14" />
            <p className="text-2xl sm:text-4xl font-bold">
              {user.referrals || 0}
            </p>
          </div>
        </div>

        {/* Rewards earned */}
        <div className="flex flex-col items-center">
          <h1 className="text-lg sm:text-2xl font-semibold">Points Earned</h1>
          <div className="flex items-center justify-center gap-4 sm:gap-5 mt-4">
            <img src={images.coin} alt="" className="w-10 h-10 sm:w-14 sm:h-14" />
            <p className="text-2xl sm:text-4xl font-bold">
              {user.rewards || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
