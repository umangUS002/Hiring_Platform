import React, { useContext } from 'react'
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

function ReferralsTableItem({ ref, fetchReferrals, index }) {
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

  const { candidateId, name, createdAt, email, contact, status, resumeUrl } = ref;
  const RefDate = new Date(createdAt);

  // const deleteBlog = async () => {
  //   const confirm = window.confirm('Sure you want to delete this Blog?');
  //   if (!confirm) return;
  //   try {
  //     const { data } = await axios.post('/api/blog/delete', { id: blog._id });
  //     if (data.success) {
  //       toast.success(data.message);
  //       await fetchBlogs();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }

  // const togglePublish = async () => {
  //   const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
  //   try {
  //     if (data.success) {
  //       toast.success(data.message);
  //       await fetchBlogs();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }

  // }


  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index}</th>
      <th className='px-2 py-4'>{candidateId}</th>
      <td className='px-2 py-4'>{name}</td>
      <td className='px-2 py-4'>{contact}</td>
      <td className='px-2 py-4'>{email}</td>
      <td className='px-2 py-4 max-sm:hidden'>{RefDate.toDateString()}</td>
      <td className="px-2 py-4 text-xs">
        <span
          className={`px-3 py-1 rounded-full font-medium ${getStatusStyle(
            ref.status
          )}`}
        >
          {status.charAt(0).toUpperCase() +
            status.slice(1)}
        </span>
      </td>
      <td className='px-2 py-4'>{resumeUrl}</td>

      {/* <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
              {blog.isPublished ? 'Unpublish' : 'Publish'}
            </button>
            <img src={assets.cross_icon} alt='' className='w-8 hover:scale-110 transition-all cursor-pointer' onClick={deleteBlog} />
        </td> */}
    </tr>
  )
}

export default ReferralsTableItem
