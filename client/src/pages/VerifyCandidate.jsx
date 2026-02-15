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

        if (data.success) {
          toast.success("Verification Successful");
        }
      } catch (error) {
        toast.error("Invalid or Expired Link");
      }
    };

    verify();
  }, [token]);

  return <h2>Verifying Candidate...</h2>;
}

export default VerifyCandidate;
