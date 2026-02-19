import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import Footer from '../../components/Footer';

function SeekerDashboard() {

  const navigate = useNavigate();
  const { setToken, setShowLogin, name } = useContext(AppContext);

  // Function to logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    setShowLogin(true);
    navigate('/');
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <div className="shadow py-4">
        <div className="px-7 flex justify-between items-center">

          {/* Logo */}
          <h1
            onClick={() => navigate('/')}
            className="text-4xl font-extrabold tracking-tight cursor-pointer select-none"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pick
            </span>
            <span className="text-gray-800">Your</span>
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Hire
            </span>
          </h1>

          {/* User Section */}
          <div className="flex items-center gap-6">
            <p className="text-gray-600">
              Welcome, <span className="text-blue-500">{name}</span>
            </p>

            <ul className='list-none m-0 p-2 hover:bg-blue-100 bg-white rounded-md border text-sm'>
              <li onClick={logout} className='hover:bg-blue-100 px-1 cursor-pointer pr-1'>Logout</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-1 overflow-hidden">

        {/* ===== SIDEBAR ===== */}
        <div className="pt-5 border-r flex flex-col">

          <NavLink
            to="/seekerDash/my-referrals"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-gray-100 transition
               ${isActive ? "bg-blue-100 border-r-4 border-blue-600 font-semibold" : ""}`
            }
          >
            <img src={assets.add_icon} alt="" className="w-4" />
            <p className="max-sm:hidden">My Referrals</p>
          </NavLink>

        </div>

        {/* ===== CONTENT AREA ===== */}
        <div className="flex-1 overflow-y-auto bg-blue-50/30 p-6">
          <Outlet />
        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  )
}

export default SeekerDashboard
