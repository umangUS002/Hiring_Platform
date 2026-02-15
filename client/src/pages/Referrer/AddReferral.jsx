import React, { useContext, useEffect, useRef, useState } from 'react'
//import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

function SubmitReferral() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('0');
  const [exp, setExp] = useState('0');
  const [currComp, setCurrComp] = useState('');
  const [linkedProf, setLinkedProf] = useState('');
  const [resume, setResume] = useState(null);

  const [isAdding, setIsAdding] = useState(false);

  const { token, backendUrl } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("experience", exp);
      formData.append("currComp", currComp);
      formData.append("linkedProf", linkedProf);
      formData.append("resume", resume);

      const { data } = await axios.post(
        backendUrl + "/api/referral/submitReferal",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      if (data.success) {
        toast.success(data.message);

        setName("");
        setEmail("");
        setContact("");
        setExp("");
        setCurrComp("");
        setLinkedProf("");
        setResume(null);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Submission Failed");
    } finally {
      setIsAdding(false);
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='bg-blue-50/50 min-h-[calc(100vh-70px)] container p-4 flex flex-col w-full items-start gap-3'>

      <div className='w-full'>
        <p className='mb-2'>Name</p>
        <input type='text' placeholder='Type Here' onChange={e => setName(e.target.value)}
          value={name} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Email</p>
        <input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}
          value={email} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Contact</p>
          <input type='number' placeholder='Contact' onChange={e => setContact(e.target.value)}
            value={contact} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
          />
        </div>

        <div>
          <p className='mb-2'>Experience (yrs.)</p>
          <input type='number' placeholder='Experience' onChange={e => setExp(e.target.value)}
            value={exp} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
          />
        </div>

        <div>
          <p className='mb-2'>Current Company</p>
          <input type='text' placeholder='Current Company' onChange={e => setCurrComp(e.target.value)}
            value={currComp} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
          />
        </div>
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Linkedin Profile</p>
        <input type='text' placeholder='Linkedin Profile' onChange={e => setLinkedProf(e.target.value)}
          value={linkedProf} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>
      <div className='w-full max-w-lg'>
        <p className='my-2'>Upload Resume (PDF/DOC)</p>
        <input
          type='file'
          accept='.pdf,.doc,.docx'
          onChange={(e) => setResume(e.target.files[0])}
          required
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded bg-white'
        />
      </div>

      <button disabled={isAdding} className='w-28 cursor-pointer py-3 mt-4 bg-blue-500 text-white rounded'>{isAdding ? "Adding..." : "Add"}</button>

    </form>
  )
}

export default SubmitReferral
