import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Navbar from '../common/Navbar'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value.toLowerCase());
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        } else {
            toast.error("Invalid company selected");
        }
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error.message)
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar/>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <form onSubmit={submitHandler} className="p-8 w-full max-w-3xl bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Post a New Job</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Job Title"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Job Description"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                            <textarea
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Job Requirements"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Salary"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Location"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
                            <input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Full-time, Part-time"
                            />
                        </div>

                        <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience Level</label>
                            <input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Experience Level"
                            />
                        </div>

                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Number of Positions</label>
                            <input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Number of Positions"
                            />
                        </div>

                        {companies.length > 0 ? (
                            <div>
                                <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">Select a Company</label>
                                <select
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    name="companyId"
                                    value={input.companyId}
                                    onChange={(e) => selectChangeHandler(e.target.value)}
                                >
                                    <option disabled value="">Select a Company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company.name.toLowerCase()}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <p className="text-xs text-red-600 font-bold text-center my-3">
                                *Please register a company first before posting a job.
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    {loading ? (
                        <button type="button" className="w-full py-2 bg-indigo-500 text-white rounded-md flex justify-center items-center">
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Posting Job...
                        </button>
                    ) : (
                        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Post New Job
                        </button>
                    )}
                </div>

                {companies.length === 0 && <p className="text-xs text-red-600 font-bold text-center mt-4">*Please register a company first before posting a job.</p>}
            </form>
        </div>
        </div>
    );
}

export default PostJob;
