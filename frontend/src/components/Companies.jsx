import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
                <div className="flex items-center justify-between my-5">
                    <input
                        className="w-full max-w-xs px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Search by company name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={() => navigate("/admin/companies/create")}
                        className="ml-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                    >
                        New Company
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
}

export default Companies;
