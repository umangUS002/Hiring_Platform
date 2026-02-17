import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';

function RecruiterDashBoard() {

    const navigate = useNavigate();
    const {setToken, token, recruiterData, setRecruiterData} = useContext(AppContext);

    // Function to logout
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setRecruiterData(null);
        navigate('/');
    }

    useEffect(()=>{
        if(recruiterData){
            navigate('/recruiterDash/manage-referrals')
        }
    },[recruiterData])

  return (
    <div className='min-h-screen'>

        {/*Navbar for recruiter panel*/}
        <div className='shadow py-4'>
            <div className='px-5 flex justify-between items-center'>
                <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt=''/>
                                    
                {recruiterData && (
                    <div className='flex items-center gap-3'>
                    <p className='max-sm:hidden'>Welcome, {recruiterData.name} </p>
                    <div className='relative group'>
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                )}

                
            </div>
        </div>

        <div className='flex items-start'>

            {/*Left Sidebar*/}
            <div className='inline-block min-h-screen border-r-1'>
                <ul className='flex flex-col items-center pt-5 text-gray-800'>
                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/recruiterDash/all-referrals'}>
                        <img className='min-w-4' src={assets.home_icon} alt='' />
                        <p className='max-sm:hidden'>All Referrals</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/recruiterDash/my-actions'}>
                        <img className='min-w-4' src={assets.home_icon} alt='' />
                        <p className='max-sm:hidden'>My Actions</p>
                    </NavLink>
                </ul>
            </div>

            <div className='flex-1 h-full p-2 sm:p-5'>
                <Outlet/>
            </div>

        </div>
      
    </div>
  )
}

export default RecruiterDashBoard
