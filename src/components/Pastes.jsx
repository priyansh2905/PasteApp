import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId));
    }

    function handleShare(pasteId) {
        const shareLink = `${window.location.origin}/pastes/${pasteId}`; 
        navigator.clipboard.writeText(shareLink); 
        toast.success('Link copied to clipboard: ' + shareLink);
    }

    function formatDate(date) {
        return new Date(date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
    }

    return (
        <div>
            <input className='p-2 rounded-xl min-w-[600px] mt-5' type="search" value={searchTerm} placeholder='Search paste here' onChange={(e) => setSearchTerm(e.target.value)}/>
            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div className='border' key={paste?._id}>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-row place-content-evenly'>
                                        <button>
                                            <a href={`/?pasteId=${paste?._id}`}>
                                                Edit
                                            </a>
                                        </button>
                                        <button>
                                            <a  href={`/pastes/${paste?._id}`}>
                                                View
                                            </a>
                                        </button>
                                        <button style={{ color: '#646cff' }} onClick={() => handleDelete(paste?._id)}>
                                            Delete
                                        </button>
                                        <button style={{ color: '#646cff' }} onClick={() =>
                                            {navigator.clipboard.writeText(paste?.content)
                                                toast.success("Copied successfully")
                                            }
                                    
                                        }>
                                            Copy
                                        </button>
                                        <button style={{ color: '#646cff' }} onClick={() => handleShare(paste?._id)}>
                                            Share
                                        </button>
                                    </div>
                                    <div>
                                        Created At: {formatDate(paste.createdAt)}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Pastes