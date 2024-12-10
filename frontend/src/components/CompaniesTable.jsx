import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany =
            companies.length >= 0 &&
            companies.filter((company) => {
                if (!searchCompanyByText) {
                    return true;
                }
                return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
            });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <caption className="text-left font-semibold text-lg my-2">
                    A list of your recent registered companies
                </caption>
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600">Logo</th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600">Name</th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterCompany?.map((company) => (
                        <tr key={company._id} className="hover:bg-gray-50 transition-all duration-200">
                            <td className="border border-gray-300 px-4 py-4 text-center">
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="w-12 h-12 object-cover rounded-full mx-auto"
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-4 text-sm text-gray-800">{company.name}</td>
                            <td className="border border-gray-300 px-4 py-4 text-sm text-gray-600">
                                {company.createdAt.split('T')[0]}
                            </td>
                            <td className="border border-gray-300 px-4 py-4 text-right">
                                <button
                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompaniesTable;
