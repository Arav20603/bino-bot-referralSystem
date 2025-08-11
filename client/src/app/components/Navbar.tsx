import { useEffect, useState } from 'react';
import { images } from '../../constants/images';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { logOut } from '../features/user/userSlice';
import { Bounce, toast } from 'react-toastify';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({ name: '', email: '', link: '' });
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleClick = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    try {
      dispatch(logOut());
      toast.success('User successfully logged out...', {
        position: 'top-center',
        autoClose: 2000,
        transition: Bounce,
      });

      setTimeout(() => {
        setShowMenu(false);
        navigate('/login');
      }, 1000);
    } catch {
      toast.error(`Error logging out`, {
        position: 'top-center',
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="nav-bar fixed top-0 left-0 z-[999] w-full bg-white shadow-sm backdrop-blur-md">
      <div className="nav flex justify-between items-center px-4 sm:px-8 lg:px-40 py-4">
        {/* logo */}
        <div className="logo flex gap-4 sm:gap-6 items-center">
          <img src={images.logo} alt="logo" className="w-14 sm:w-20 lg:w-28" />
          <img src={images.bino} alt="bino" className="w-14 sm:w-20 lg:w-28" />
        </div>

        {/* menu */}
        <button
          onClick={handleClick}
          className="relative border-2 border-gray-400 rounded-xl p-2 sm:mr-10 lg:mr-20"
        >
          <img
            src={images.menu}
            alt="menu"
            className="w-8 sm:w-10 lg:w-14 h-auto"
          />
        </button>

        {/* dropdown menu */}
        {showMenu && (
          <div className="box absolute right-4 sm:right-20 lg:right-[180px] top-[80px] sm:top-[100px] shadow-lg rounded-lg">
            <ul className="bg-white p-4 flex flex-col gap-3 min-w-[200px] rounded-lg border border-gray-200">
              <li className="px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
                Home
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                Logout{' '}
                <i
                  className="fa fa-sign-out ml-3 text-red-500"
                  style={{ fontSize: 20 }}
                ></i>
              </li>
              <p className="px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
                Refer a Friend
              </p>

              {/* User Link + Copy Button */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-md">
                <span className="truncate text-sm text-gray-700">
                  {user.link}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(user.link);
                    toast.success('Copied to clipboard', {
                      position: 'top-center',
                      autoClose: 2000,
                      transition: Bounce,
                    });
                  }}
                  className="px-2.5 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Copy
                </button>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
