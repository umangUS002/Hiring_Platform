import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import OtpLogin from './OtpLogin';

function Login() {

    const navigate = useNavigate();
    const { setShowLogin, backendUrl, setToken, role, setRole, setShowOtpLogin, showOtpLogin, setName } = useContext(AppContext);

    const [state, setState] = useState('Login');
    const [localName, setLocalName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            if (state === "Login") {

                const { data } = await axios.post(
                    backendUrl + "/api/auth/login",
                    { email, password }
                );

                if (data.success) {

                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.user.role);
                    localStorage.setItem("name", data.user.name);

                    setName(data.user.name);
                    setToken(data.token);
                    setRole(data.user.role);

                    if (data.user.role === "Recruiter") {
                        navigate("/recruiterDash");
                    } else if (data.user.role === "Seeker") {
                        navigate("/seekerDash");
                    } else if (data.user.role === "Referer") {
                        navigate("/refererDash");
                    } else {
                        navigate("/adminDash");
                    }

                    setShowLogin(false);
                    toast.success("Login Successful");

                } else {
                    toast.error(data.message);
                }

            } else {
                const { data } = await axios.post(
                    backendUrl + "/api/auth/signup",
                    { localName, email, password, role }
                );

                if (data.success) {

                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.user.role);
                    localStorage.setItem("name", data.user.name);

                    setNamee(data.user.name);
                    setToken(data.token);
                    setRole(data.user.role);

                    if (data.user.role === "Recruiter") {
                        navigate("/recruiterDash");
                    } else if (data.user.role === "Seeker") {
                        navigate("/seekerDash");
                    } else if (data.user.role === "Referer") {
                        navigate("/refererDash");
                    } else {
                        navigate("/adminDash");
                    }

                    setShowLogin(false);
                    toast.success("Signup Successful");

                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };


    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

            <div className='relative bg-white p-10 rounded-xl text-slate-500 w-[400px]'>

                <h1 className="text-4xl text-center font-extrabold tracking-tight cursor-pointer select-none">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Pick
                    </span>
                    <span className="text-gray-800">Your</span>
                    <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                        Hire
                    </span>
                </h1>

                <p className='text-sm text-center'>
                    Welcome back! Please {state} to continue
                </p>

                {/* PASSWORD LOGIN FORM */}
                {!showOtpLogin && (
                    <form onSubmit={onSubmitHandler}>

                        {state === 'Sign Up' ? (
                            <>
                                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                    <img src={assets.person_icon} alt='' />
                                    <input
                                        className='outline-none text-sm w-full'
                                        onChange={e => setLocalName(e.target.value)}
                                        value={localName}
                                        type='text'
                                        placeholder='Your Name'
                                        required
                                    />
                                </div>

                                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                    <img src={assets.email_icon} alt='' />
                                    <input
                                        className='outline-none text-sm w-full'
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        type='email'
                                        placeholder='Email Id'
                                        required
                                    />
                                </div>

                                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                    <img src={assets.lock_icon} alt='' />
                                    <input
                                        className='outline-none text-sm w-full'
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        type='password'
                                        placeholder='Password'
                                        required
                                    />
                                </div>

                            </>
                        ) : (
                            <>
                                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                    <img src={assets.email_icon} alt='' />
                                    <input
                                        className='outline-none text-sm w-full'
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        type='email'
                                        placeholder='Email Id'
                                        required
                                    />
                                </div>

                                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                    <img src={assets.lock_icon} alt='' />
                                    <input
                                        className='outline-none text-sm w-full'
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        type='password'
                                        placeholder='Password'
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type='submit'
                            className='bg-blue-600 w-full cursor-pointer text-white py-2 rounded-full mt-6'
                        >
                            {state === 'Login' ? 'Login' : 'Create Account'}
                        </button>

                    </form>
                )}

                {/* DIVIDER */}
                {state === "Login" && (
                    <>
                        <div className='flex items-center gap-2 my-6'>
                            <div className='flex-1 h-[1px] bg-gray-200'></div>
                            <span className='text-xs text-gray-400'>OR</span>
                            <div className='flex-1 h-[1px] bg-gray-200'></div>
                        </div>

                        <OtpLogin />
                    </>
                )}

                {/* TOGGLE */}
                <p className='mt-6 text-center text-sm'>
                    {state === 'Login'
                        ? <>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></>
                        : <>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></>
                    }
                </p>

                <img
                    onClick={() => setShowLogin(false)}
                    src={assets.cross_icon}
                    alt=''
                    className='absolute top-5 right-5 cursor-pointer'
                />

            </div>
        </div>
    );

}

export default Login
