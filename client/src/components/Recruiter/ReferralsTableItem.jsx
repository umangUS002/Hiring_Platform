import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function ReferralsTableItem({ referral, index }) {

    const { backendUrl, token, fetchReferralsRec } = useContext(AppContext);

    const takeDecision = async (decision) => {
        try {

            await axios.post(
                `${backendUrl}/api/recruiter/action/${referral._id}`,
                { decision },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Decision saved");
            fetchReferralsRec();

        } catch (error) {
            toast.error("Failed to update");
        }
    };


    return (
        <tr className='border-b hover:bg-gray-50'>

            <td className='px-4 py-3'>{index + 1}</td>

            <td className='px-4 py-3'>{referral.name}</td>

            <td className='px-4 py-3'>{referral.experience} yrs</td>

            <td className='px-4 py-3'>
                {referral.skills?.map((skill, i) => (
                    <span
                        key={i}
                        className='bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full mr-2'
                    >
                        {skill}
                    </span>
                ))}
            </td>

            <td className='px-4 py-3 capitalize'>
                {referral.status}
            </td>

            <td className="px-4 py-3">
                {referral.myDecision ? (
                    <span className="text-sm font-semibold capitalize">
                        {referral.myDecision}
                    </span>
                ) : (
                    <span className="text-gray-400">No Action</span>
                )}
            </td>


            <td className='px-4 py-3'>
                <a
                    href={referral.resumeUrl}
                    target='_blank'
                    className='text-blue-600 underline'
                >
                    View
                </a>
            </td>

            <td className='px-4 py-3 space-x-2'>

                <button
                    onClick={() => takeDecision("shortlisted")}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                >
                    Shortlist
                </button>

                <button
                    onClick={() => takeDecision("rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                >
                    Reject
                </button>

                <button
                    onClick={() => takeDecision("hold")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                >
                    Hold
                </button>


            </td>

        </tr>
    );
}

export default ReferralsTableItem;
