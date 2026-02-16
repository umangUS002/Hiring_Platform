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
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Profile completed successfully!");
      navigate("/seekerDash");

    } catch (error) {
      toast.error("Failed to complete profile");
    }
  };

  if (!referral) return <h2>Loading...</h2>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>

      <p><strong>Name:</strong> {referral.name}</p>
      <p><strong>Email:</strong> {referral.email}</p>

      <div className="mt-4">
        <label>Experience</label>
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border w-full p-2"
        />
      </div>

      <div className="mt-4">
        <label>Current Company</label>
        <input
          type="text"
          value={currComp}
          onChange={(e) => setCurrComp(e.target.value)}
          className="border w-full p-2"
        />
      </div>

      <div className="mt-4">
        <label>Skills (comma separated)</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="border w-full p-2"
        />
      </div>

      <div className="mt-4">
        <label>Upload Updated Resume (optional)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>

      <button
        onClick={submitHandler}
        className="bg-blue-600 text-white px-4 py-2 mt-6"
      >
        Confirm & Verify
      </button>
    </div>
  );
}

export default CompleteProfile;
