import { useEffect, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const encodedQuery = encodeURIComponent(searchQuery);
      window.open(`https://wa.me/+919800081110?text=${encodedQuery}`, '_blank');
    }
    setSearchQuery('')
  };

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

      {/* Find Anything Anywhere Section */}
      <div className="mt-14 w-full bg-gradient-to-r from-blue-600 to-blue-900 py-14 px-6 sm:px-20 text-white text-center rounded-t-3xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find Anything Anywhere</h2>
        <p className="max-w-3xl mx-auto text-lg opacity-90 mb-8">
          Your intelligent WhatsApp platform that connects you with the best products and services from our network of businesses.
          No apps, no complexity — just instant offers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-2/3 p-3 rounded-lg border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Search on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
