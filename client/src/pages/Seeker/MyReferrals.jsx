import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SeekerTableItem from "../../components/Seeker/SeekerTableItem";

function MyReferrals() {

  const { myReferrals, fetchMyReferrals } = useContext(AppContext);

  useEffect(() => {
    fetchMyReferrals();
  }, []);

  return (
    <div className="flex-1 pt-8 pb-12 px-8 bg-blue-50/40 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">
        My Applications
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-gray-600">

          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-4">#</th>
              <th className="px-4 py-4">Referrer</th>
              <th className="px-4 py-4">Experience</th>
              <th className="px-4 py-4">Skills</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Resume</th>
              <th className="px-4 py-4">Referred On</th>
            </tr>
          </thead>

          <tbody>
            {myReferrals.length > 0 ? (
              myReferrals.map((referral, index) => (
                <SeekerTableItem
                  key={referral._id}
                  referral={referral}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No applications yet
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default MyReferrals;
