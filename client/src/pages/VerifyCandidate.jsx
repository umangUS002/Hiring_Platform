import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

function VerifyCandidate() {
  const { token, backendUrl } = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/referral/verify/${token}`
        );

        if (!data.success) return;

        // If candidate already registered
        if (data.candidateId) {

          // If not logged in → go to login
          if (!localStorage.getItem("token")) {
            navigate(`/login?redirect=/complete-profile/${token}`);
          } else {
            navigate(`/complete-profile/${token}`);
          }

        }

      } catch (error) {
        toast.error("Invalid or expired link");
      }
    };

    verify();
  }, [token]);


  return <h2>Verifying Candidate...</h2>;
}

export default VerifyCandidate;
