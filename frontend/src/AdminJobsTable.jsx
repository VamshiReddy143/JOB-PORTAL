import React, { useEffect, useState } from 'react';
import { Edit2, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <table className="w-full border-collapse border border-gray-300">
                <caption className="text-lg font-bold mb-2">A list of your recent posted jobs</caption>
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Company Name</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterJobs?.map((job) => (
                        <tr key={job._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{job?.company?.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{job?.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{job?.createdAt.split("T")[0]}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">

                                        <div className="dropdown right-0  w-32 border-gray-300 shadow-lg ">
                                            <div tabIndex={0} role="button" className="btn m-1">....</div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            <div
                                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                                            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                                <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            <Eye className="w-4" />
                                            <span>Applicants</span>
                                        </div>
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

export default AdminJobsTable;
