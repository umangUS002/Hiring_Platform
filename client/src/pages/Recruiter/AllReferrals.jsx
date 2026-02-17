import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import ReferralsTableItem from '../../components/Recruiter/ReferralsTableItem';

function AllReferralsRec() {

    const { referralsRec, fetchReferralsRec } = useContext(AppContext);

    const [skill, setSkill] = useState("");
    const [exp, setExp] = useState("");

    useEffect(() => {
        fetchReferralsRec();
    }, []);

    const handleFilter = () => {
        fetchReferralsRec(skill, exp);
    };

    return (
        <div className='flex-1 pt-8 pb-12 px-8 bg-blue-50/40 min-h-screen'>

            <h1 className='text-2xl font-semibold mb-6'>
                Verified Candidates
            </h1>

            {/* Filters */}
            <div className='flex gap-4 mb-6'>
                <input
                    type='text'
                    placeholder='Filter by skill'
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className='border px-4 py-2 rounded-md'
                />

                <input
                    type='number'
                    placeholder='Min Experience'
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    className='border px-4 py-2 rounded-md'
                />

                <button
                    onClick={handleFilter}
                    className='bg-blue-600 text-white px-6 py-2 rounded-md'
                >
                    Apply
                </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto shadow rounded-lg bg-white'>
                <table className='w-full text-sm text-gray-600'>

                    <thead className='bg-gray-100 text-xs uppercase'>
                        <tr>
                            <th className='px-4 py-4'>#</th>
                            <th className='px-4 py-4'>Name</th>
                            <th className='px-4 py-4'>Experience</th>
                            <th className='px-4 py-4'>Skills</th>
                            <th className='px-4 py-4'>Status</th>
                            <th className='px-4 py-4'>Resume</th>
                            <th className='px-4 py-4'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {referralsRec.length > 0 ? (
                            referralsRec.map((item, index) => (
                                <ReferralsTableItem
                                    key={item._id}
                                    referral={item}
                                    index={index}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    No candidates found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default AllReferralsRec;
