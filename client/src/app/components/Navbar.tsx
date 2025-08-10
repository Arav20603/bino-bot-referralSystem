import React, { useEffect, useState } from 'react'
import { images } from '../../constants/images'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { logOut } from '../features/user/userSlice'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState({
    name: '', email: '', link: ''
  })
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData !== null) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleClick = () => {
    setShowMenu(prev => !prev)
  }

  const handleLogout = () => {
    try {
      dispatch(logOut())
      alert(`Successfully logged out`)
      setInterval(() => {
        handleClick()
        navigate('/login')
      }, 1000)
    } catch (error) {
      alert(`Error in logging out: ${error}`)
    }
    
  }

  return (
    <div className="fixed top-0 left-0 z-[999] w-full bg-white shadow-sm backdrop-blur-md">
      <div className="flex justify-between mx-40 my-10">
        {/* logo */}
        <div className="flex gap-6">
          <img src={images.logo} alt="logo" className="w-30" />
          <img src={images.bino} alt="bino" className="w-29" />
        </div>

        {/* menu */}
        <Link to='#' onClick={handleClick}><img src={images.menu} alt="menu" className="w-15 h-15 mr-20 border-2 border-gray-400 rounded-xl p-2" /></Link>
          {/* menu bar */}
          { showMenu && ( <div className="absolute right-[180px] top-[120px] shadow-lg rounded-lg">
            <ul className="bg-white p-4 flex flex-col gap-3 min-w-[200px] rounded-lg border border-gray-200">
              <li
                onClick={handleLogout}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                Logout <i className='fa fa-sign-out ml-3 text-red-500' style={{ fontSize: 20 }}></i>
              </li>
              <p className="px-4 py-2 rounded-md hover:bg-gray-100 transition">Refer a Friend</p>

              {/* User Link + Copy Button */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-md">
                <span className="truncate text-sm text-gray-700">{user.link}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(user.link)
                    alert("Link copied to clipboard!")
                  }}
                  className="px-2.5 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Copy
                </button>
              </div>
            </ul>
          </div> )
        }

      </div>
    </div>


  )
}

export default Navbar
