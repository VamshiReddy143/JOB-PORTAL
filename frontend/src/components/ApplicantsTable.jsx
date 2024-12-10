import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    // Function to handle the status update
    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating status");
        }
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
            <table className="min-w-full divide-y divide-gray-200">
                <caption className="text-xl font-semibold text-gray-700 mb-4">Recent Applicants</caption>
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">FullName</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Contact</th>
                        <th className="px-6 py-3 text-left">Resume</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {applicants?.applications?.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{item?.applicant?.fullname}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item?.applicant?.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item?.applicant?.phoneNumber}</td>
                            <td className="px-6 py-4 text-sm text-blue-600">
                                {item.applicant?.profile?.resume ? (
                                    <a href={item.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="underline">
                                        {item.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    "NA"
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item?.applicant.createdAt.split("T")[0]}</td>
                            <td className="px-6 py-4 text-sm text-right">
                                {/* DaisyUI Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="btn btn-ghost">
                                        <MoreHorizontal />
                                    </button>
                                    <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-40">
                                        {shortlistingStatus.map((status, index) => (
                                            <li key={index} onClick={() => statusHandler(status, item._id)}>
                                                <a>{status}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTable;
