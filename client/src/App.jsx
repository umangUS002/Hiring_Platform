import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import RefererDashBoard from './pages/Referrer/RefererDashboard';
import SeekerDashboard from './pages/Seeker/SeekerDashboard';
import RecruiterDashBoard from './pages/Recruiter/RecruiterDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SubmitReferral from './pages/Referrer/AddReferral';
import AllReferrals from './pages/Referrer/AllReferrals';
import VerifyCandidate from './pages/VerifyCandidate';
import Register from './pages/Seeker/Register';

function App() {
  const { showLogin, token, role } = useContext(AppContext);

  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={showLogin ? <Login /> : <></>} />

        {token && role === "Admin" && (
          <Route path="/adminDash" element={<AdminDashboard />} />
        )}

        {token && role === "Recruiter" && (
          <Route path="/recruiterDash" element={<RecruiterDashBoard />} />
        )}

        {token && role === "Seeker" && (
          <Route path="/seekerDash" element={<SeekerDashboard />} />
        )}

        {token && role === "Referer" && (
          <Route path='/refererDash' element={<RefererDashBoard />} > 
            <Route path='submit-referrals' element={<SubmitReferral />} /> 
            <Route path='all-referrals' element={<AllReferrals />} /> 
          </Route>
        )}
        
        <Route path="/verify/:token" element={<VerifyCandidate />} />
        <Route path="/register/:token" element={<Register />} />

      </Routes>

    </div>
  )
}

export default App
