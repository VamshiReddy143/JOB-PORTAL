import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
        >


           <div className='flex items-center'>
           <div>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={job.company?.logo} />
                    </div>
                </div>
            </div>


            <div className='ml-3'>
                <h1 className="font-medium text-lg ">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>
           </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <span className="px-3 py-1 text-blue-700 font-bold bg-blue-100 rounded-md">
                    {job?.position} Positions
                </span>
                <span className="px-3 py-1 text-[#F83002] font-bold bg-red-100 rounded-md">
                    {job?.jobType}
                </span>
                <span className="px-3 py-1 text-[#7209b7] font-bold bg-purple-100 rounded-md">
                    {job?.salary} LPA
                </span>
            </div>
        </div>
    );
};

export default LatestJobCards;
