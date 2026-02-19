import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import ReferralsTableItem from '../../components/Referrer/ReferralsTableItem';

function AllReferrals() {

    const { referrals, fetchReferrals } = useContext(AppContext);

    return (
        <div>
            <div className='flex-1 pt-5 pb-10 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-[calc(100vh-100px)]'>
                <h1 className='text-black font-semibold text-3xl'>All Referrals</h1>
                <div className='relative h-4/5 max-w-6xl mt-4 overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                    <table className='w-full text-sm text-gray-500'>
                        <thead className='text-xs text-gray-600 text-left text-center uppercase'>
                            <tr className='text-center'>
                                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                                {/* <th scope='col' className='px-2 py-4'>Candidate's Id</th> */}
                                <th scope='col' className='px-2 py-4'>Candidate's Name</th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'>Contact</th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'>Email</th>
                                <th scope='col' className='px-2 py-4'>Date</th>
                                <th scope='col' className='px-2 py-4'>Status</th>
                                <th scope='col' className='px-2 py-4'>Resume</th>
                            </tr>
                        </thead>

                        <tbody>
                            {referrals.length > 0 ? (
                                referrals.map((ref, index) => (
                                    <ReferralsTableItem
                                        key={ref._id}
                                        ref={ref}
                                        index={index}
                                        fetchReferrals={fetchReferrals}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-500">
                                        No referrals found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllReferrals
