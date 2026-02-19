import React from "react";

function SeekerTableItem({ referral, index }) {

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "verified":
        return "bg-blue-100 text-blue-700";
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "hold":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const appliedDate = new Date(referral.createdAt)
    .toLocaleDateString();

  return (
    <tr className="text-center border-t hover:bg-gray-50 text-sm align-middle">

      {/* Index */}
      <td className="px-6 py-5 text-center text-gray-500">
        {index + 1}
      </td>

      {/* Referrer */}
      <td className="px-6 py-5">
        <div className="text-center font-semibold text-gray-800">
          {referral.referrerId?.name}
        </div>
        <div className="text-center text-xs text-gray-500">
          {referral.referrerId?.email}
        </div>
      </td>

      {/* Experience */}
      <td className="px-6 py-5 text-center whitespace-nowrap">
        <span className="font-medium text-gray-700">
          {referral.experience} yrs
        </span>
      </td>

      {/* Skills */}
      <td className="px-6 py-5">
        <div className="flex text-center flex-wrap gap-2 max-w-xs">
          {referral.skills?.length > 0 ? (
            referral.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-xs rounded-full"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">
              No skills added
            </span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-5 text-center">
        <span
          className={`inline-block min-w-[90px] text-center px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusStyle(
            referral.status
          )}`}
        >
          {referral.status}
        </span>
      </td>

      {/* Resume */}
      <td className="px-6 py-5 text-center">
        <a
          href={referral.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          View Resume
        </a>
      </td>

      {/* Date */}
      <td className="px-6 py-5 text-center text-gray-500 whitespace-nowrap">
        {appliedDate}
      </td>

    </tr>
  );
}

export default SeekerTableItem;
