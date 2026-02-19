import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

function MyActions() {

  const { backendUrl, token } = useContext(AppContext);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchMyActions();
  }, []);

  const fetchMyActions = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/recruiter/my-actions`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        setActions(data.actions);
      }

    } catch (error) {
      toast.error("Failed to load your actions");
    }
  };

  return (
    <div className="flex-1 pt-8 pb-12 px-8 bg-blue-50/40 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">
        My Reviewed Applications
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-gray-600">

          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-4">#</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Experience</th>
              <th className="px-4 py-4">Skills</th>
              <th className="px-4 py-4">My Decision</th>
              <th className="px-4 py-4">Resume</th>
            </tr>
          </thead>

          <tbody>
            {actions.length > 0 ? (
              actions.map((action, index) => (
                <tr key={action._id} className="border-b">

                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="text-center px-4 py-3">
                    {action.referralId?.name}
                  </td>

                  <td className="text-center px-4 py-3">
                    {action.referralId?.experience} yrs
                  </td>

                  <td className="text-center px-4 py-3">
                    {action.referralId?.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full mr-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </td>

                  <td className="text-center px-4 py-3">
                    {action.decision ? (
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full capitalize
        ${action.decision === "shortlisted"
                            ? "bg-green-100 text-green-700"
                            : action.decision === "rejected"
                              ? "bg-red-100 text-red-700"
                              : action.decision === "hold"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                          }
      `}
                      >
                        {action.decision}
                      </span>
                    ) : (
                      <span className="text-center px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">
                        No Action
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <a
                      href={action.referralId?.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-center text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-center py-6">
                  No actions taken yet
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default MyActions;
