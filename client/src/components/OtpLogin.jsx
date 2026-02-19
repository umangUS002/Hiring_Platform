import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function OtpLogin() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {setName, setToken, setRole} = useContext(AppContext);
    
    const sendOtp = async () => {
        try {

            if (!email) {
                toast.error("Please enter Email");
                return;
            }

            setLoading(true);
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`,
                { email }
            );
            setLoading(false);
            setStep(2);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,
                { email, otp }
            );

            if (!data.success) {
                toast.error(data.message || "Invalid OTP");
                return;
            }

            // Save
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("name", data.user.name);

            setName(data.user.name);
            setToken(data.token);
            setRole(data.user.role);

            toast.success("Login Successful...");

            // Navigate
            if (data.user.role === "Recruiter") {
                navigate("/recruiterDash");
            } else if (data.user.role === "Referer") {
                navigate("/refererDash");
            } else if (data.user.role === "Admin") {
                navigate("/adminDash");
            } else {
                navigate("/seekerDash");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Invalid or expired OTP"
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            {step === 1 ? (
                <>
                    <div className="border px-1 py-1 flex items-center gap-2 rounded-full mt-5">
                        <img src={assets.email_icon} alt='' />
                        <input
                            className='outline-none text-sm'
                            required
                            type="email"
                            disabled={loading}
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='bg-blue-600 w-full text-white py-2 px-2 rounded-full mt-1 cursor-pointer' onClick={sendOtp}>
                            {loading ? (<div className="flex justify-center items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ...
                            </div>) : ("Send OTP")}
                        </button>
                    </div>

                </>
            ) : (
                <>
                    <div className="border px-1 py-1 flex items-center gap-2 rounded-full mt-5">
                        <input
                            className='outline-none text-sm'
                            type="text"
                            required
                            placeholder="Enter OTP"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button className='bg-blue-600 w-full text-white py-2 px-2 rounded-full mt-1 cursor-pointer' onClick={verifyOtp}>
                            {loading ? (<div className="flex justify-center items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ...
                            </div>) : ("Verify OTP")}
                        </button>
                    </div>
                </>
            )}

        </div>
    );
}

export default OtpLogin;
