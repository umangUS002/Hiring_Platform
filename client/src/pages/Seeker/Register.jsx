import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function Register() {

  const navigate = useNavigate();
  const { token } = useParams();   // 🔥 Get token from URL
  const { backendUrl, setRole } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
          role: "Seeker",
          token   // 🔥 Send token to backend
        }
      );

      if (data.success) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        setRole(data.user.role);

        toast.success("Registration Successful");

        if (token) {
          navigate(`/complete-profile/${token}`);
        } else {
          navigate("/seekerDash");
        }



      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">

      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-96"
      >

        <h1 className="text-center text-2xl pb-2 text-neutral-700 font-medium">
          Create Account
        </h1>

        {token && (
          <p className="text-green-600 text-sm text-center mb-3">
            You were referred! Complete registration to verify.
          </p>
        )}

        {/* Name */}
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.person_icon} alt="" />
          <input
            className="outline-none text-sm w-full"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />
          <input
            className="outline-none text-sm w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none text-sm w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-6"
        >
          Register
        </button>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;
