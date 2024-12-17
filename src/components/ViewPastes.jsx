import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ViewPastes = () => {

    const {id} = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.filter((p) => p._id === id)[0];


  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
            <input className='p-2 rounded-xl mt-2 w-[100%] pl-4' type="text" placeholder="Enter Title Here" value={paste.title} disabled onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='mt-8'>
            <textarea className='rounded-xl mt-4 min-w-[500px] min-h-[500px] p-4 resize-none' value={paste.content} disabled placeholder='Enter content here' onChange={(e) => setValue(e.target.value)}/>
        </div>
    </div>
  )
}

export default ViewPastes