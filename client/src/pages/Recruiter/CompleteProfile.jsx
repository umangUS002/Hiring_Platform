import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CompleteProfile() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [referral, setReferral] = useState(null);
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [currComp, setCurrComp] = useState("");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/referral/details/${token}`
        );

        if (data.success) {
          setReferral(data.referral);
          setExperience(data.referral.experience || "");
          setCurrComp(data.referral.currComp || "");
        }

      } catch (error) {
        toast.error("Invalid or expired link");
      }
    };

    fetchReferral();
  }, [token]);

  const submitHandler = async () => {
    try {

      const formData = new FormData();
      formData.append("skills", skills);
      formData.append("experience", experience);
      formData.append("currComp", currComp);

      if (resume) {
        formData.append("resume", resume);
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/referral/complete/${token}`,
        formData
      );

      toast.success("Profile completed successfully!");
      navigate("/seekerDash");

    } catch (error) {
      toast.error("Failed to complete profile");
    }
  };

  if (!referral) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-lg font-medium text-gray-600">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Complete Your Profile
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Please review and update your details to verify your referral.
        </p>

        {/* Candidate Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {referral.name}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Email:</strong> {referral.email}
          </p>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Experience (Years)
          </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Current Company */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Current Company
          </label>
          <input
            type="text"
            value={currComp}
            onChange={(e) => setCurrComp(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Skills (comma separated)
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        {/* Resume Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Upload Updated Resume (optional)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white"
          />
        </div>

        {/* Button */}
        <button
          onClick={submitHandler}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Confirm & Verify
        </button>

      </div>
    </div>
  );
}

export default CompleteProfile;
