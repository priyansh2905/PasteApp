import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const Home = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const allPastes = useSelector((state) => state.paste.pastes);

    const dispatch = useDispatch();

    useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])
    

    function createPaste(){

        const isDuplicateTitle = allPastes.some(
            (p) => p.title.trim().toLowerCase() === title.trim().toLowerCase() && p._id !== pasteId
        );

        if (isDuplicateTitle) {
            toast.error("A paste with this title already exists. Please choose a different title.");
            return;
        }

        const paste = {
            title : title,
            content : value,
            _id : pasteId || Date.now().toString(36),
            createdAt : new Date().toISOString(),
        }

        if(pasteId){
            dispatch(updateToPastes(paste));
        }
        else{
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between mt-5'>
            <input className='p-2 rounded-xl mt-2 w-[66%] pl-4' type="text" placeholder="Enter Title Here" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={createPaste} className='p-2 rounded-xl mt-2 bg-green-700'>
                {pasteId ? "Update My Paste" : "Create My Paste"}
            </button>
        </div>
        <div className='mt-8 '>
            <textarea className='rounded-xl mt-4 min-w-[500px] min-h-[500px] p-4 resize-none ' value={value} placeholder='Enter content here' onChange={(e) => setValue(e.target.value)}/>
        </div>
    </div>
  )
}

export default Home