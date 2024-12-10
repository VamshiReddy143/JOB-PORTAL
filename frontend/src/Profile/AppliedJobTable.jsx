import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);
    return (
        <div>
            <table className="w-full border-collapse border border-gray-300">
                <caption className="text-lg font-bold my-4">A list of your applied jobs</caption>
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Job Role</th>
                        <th className="border border-gray-300 px-4 py-2">Company</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">You haven't applied for any jobs yet.</td>
                            </tr>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <tr key={appliedJob._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">
                                        {appliedJob?.createdAt?.split("T")[0]}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {appliedJob.job?.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {appliedJob.job?.company?.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        <span
                                            className={`px-2 py-1 rounded text-white ${
                                                appliedJob?.status === "rejected"
                                                    ? 'bg-red-500'
                                                    : appliedJob.status === 'pending'
                                                    ? 'bg-gray-500'
                                                    : 'bg-green-500'
                                            }`}
                                        >
                                            {appliedJob.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobTable;