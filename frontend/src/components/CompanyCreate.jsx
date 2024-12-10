import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName) {
            toast.error("Please enter a company name.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while creating the company.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto flex flex-col justify-center mt-10 p-6 bg-white shadow-md rounded-lg">
                <div className="my-10">
                    <h1 className="font-bold text-2xl text-gray-800">Your Company Name</h1>
                    <p className="text-gray-500">
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                {/* Company Name Input */}
                <div className="my-4">
                    <label className="block text-gray-700 font-semibold">Company Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="JobHunt, Microsoft, etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
                    />
                </div>

                <div className="flex items-center gap-4 my-10">
                    <button
                        onClick={() => navigate("/admin/companies")}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={registerNewCompany}
                        className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
