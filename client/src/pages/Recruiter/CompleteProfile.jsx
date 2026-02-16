import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CompleteProfile() {

  const { token } = useParams();
  const [referral, setReferral] = useState(null);
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/referral/verify/${token}`
        );

        if (data.success) {
          setReferral(data.referral);
        }
      } catch (error) {
        toast.error("Invalid or expired link");
      }
    };

    fetchReferral();
  }, [token]);

  const submitHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/referral/complete/${token}`,
        { skills }
      );

      toast.success("Profile completed!");
      window.location.href = "/seekerDash";

    } catch (error) {
      toast.error("Failed to complete profile");
    }
  };

  if (!referral) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Complete Your Profile</h2>

      <p>Name: {referral.name}</p>
      <p>Email: {referral.email}</p>

      <input
        type="text"
        placeholder="Add Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default CompleteProfile;
