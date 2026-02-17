import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function ReferralsTableItem({ referral, index }) {

    const { backendUrl, token, fetchReferralsRec } = useContext(AppContext);

    const updateStatus = async (status) => {
        try {
            await axios.put(
                `${backendUrl}/api/referral/status/${referral._id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Status updated");
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
                    onClick={() => updateStatus("shortlisted")}
                    className='bg-green-600 text-white px-3 py-1 rounded text-xs'
                >
                    Shortlist
                </button>

                <button
                    onClick={() => updateStatus("rejected")}
                    className='bg-red-600 text-white px-3 py-1 rounded text-xs'
                >
                    Reject
                </button>

            </td>

        </tr>
    );
}

export default ReferralsTableItem;
