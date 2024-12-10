import React from 'react';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <button className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition">
                    <Bookmark />
                </button>
            </div>

            {/* Company Info Section */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gray-100 flex items-center justify-center rounded-full overflow-hidden">
                    <img src={job?.company?.logo} alt="Company Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{job?.company?.name}</h2>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            {/* Job Details */}
            <div className="mb-4">
                <h1 className="text-xl font-bold mb-2 text-gray-800">{job?.title}</h1>
                <p className="text-sm text-gray-600 leading-relaxed">{job?.description}</p>
            </div>

            {/* Job Information */}
            <div className="flex items-center gap-4 mb-6">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">{job?.position} Positions</span>
                <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">{job?.jobType}</span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{job?.salary} LPA</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Details
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                    Save For Later
                </button>
            </div>
        </div>
    );
};

export default Job;
