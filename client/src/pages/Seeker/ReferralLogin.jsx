import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ReferralLogin() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );

      if (!data.success) {
        return toast.error(data.message);
      }

      // Only seekers allowed here
      if (data.user.role !== "Seeker") {
        return toast.error("This account is not eligible for referral verification.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      toast.success("Login successful!");

      // 🔥 Direct redirect to complete profile
      navigate(`/complete-profile/${token}`);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Referral Login
        </h2>

        <p className="text-sm text-blue-600 mb-6 text-center">
          Please login to verify your referral
        </p>

        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full border p-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label>Password</label>
          <input
            type="password"
            className="w-full border p-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login & Continue
        </button>
      </form>
    </div>
  );
}

export default ReferralLogin;
