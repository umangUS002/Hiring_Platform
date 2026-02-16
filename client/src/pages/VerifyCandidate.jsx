import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyCandidate() {

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/referral/verify/${token}`
        );

        if (!data.success) return;

        // If candidate already registered
        if (data.candidateId) {

          const isLoggedIn = localStorage.getItem("token");

          if (!isLoggedIn) {
            navigate(`/referral-login/${token}`);
          } else {
            navigate(`/complete-profile/${token}`);
          }

        } else {
          navigate(`/register/${token}`);
        }


      } catch (error) {
        toast.error("Invalid or expired link");
      }
    };

    verify();
  }, [token, navigate]);

  return <h2>Verifying...</h2>;
}

export default VerifyCandidate;
