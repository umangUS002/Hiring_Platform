import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

function Login() {

    const navigate = useNavigate();
    const { setShowLogin, backendUrl, token, setToken, role, setRole, setNamee } = useContext(AppContext);

    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
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
                    toast.success("Login Successful");

                } else {
                    toast.error(data.message);
                }

            } else {
                const { data } = await axios.post(
                    backendUrl + "/api/auth/signup",
                    { name, email, password, role }
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
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 ronded-xl text-slate-500'>
                <h1 className='text-center text-2xl pb-2 text-neutral-700 font-medium'>Pick Your Hire!</h1>
                <p className='text-sm'>Welcome back! Please {state} in to continue</p>
                {state === 'Sign Up'
                    ? <>
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.person_icon} alt='' />
                            <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Your Name' required />
                        </div>

                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} alt='' />
                            <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Email Id' required />
                        </div>
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} alt='' />
                            <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required />
                        </div>

                        <div className='flex items-center gap-4 my-5'>
                            <label htmlFor="role">Select your role!</label>

                            <select
                                id="role"
                                name="role"
                                className="border px-3 py-2 rounded-md"
                                onChange={e => setRole(e.target.value)}
                                required
                            >
                                <option value="">Roles</option>
                                <option value="Seeker">Job Seeker</option>
                                <option value="Recruiter">Recruiter</option>
                                <option value="Referer">Referrer</option>
                            </select>
                        </div>
                    </>

                    : <>
                        <>

                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.email_icon} alt='' />
                                <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Email Id' required />
                            </div>
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.lock_icon} alt='' />
                                <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required />
                            </div>

                        </>
                    </>
                }

                {state === 'Login' &&
                    <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot Password</p>
                }

                <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4 cursor-pointer'>
                    {state === 'Login' ? 'Login' : 'Create Account'}
                </button>

                {
                    state === 'Login'
                        ? <p className='mt-5 text-center'>Don't have and account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                        : <p className='mt-5 text-center'>Already have an account <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
                }

                <img onClick={e => setShowLogin(false)} src={assets.cross_icon} alt='' className='absolute top-5 right-5 cursor-pointer' />

            </form>
        </div>
    )
}

export default Login
