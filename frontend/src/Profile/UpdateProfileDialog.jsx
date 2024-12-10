// UpdateProfileDialog Component
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';
import { toast } from 'react-hot-toast';

const UpdateProfileDialog = ({ setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                toast.error("Only PDF files are allowed");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2 MB");
                return;
            }
            setInput({ ...input, file });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <label>
                            Name
                            <input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            />
                        </label>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            />
                        </label>
                        <label>
                            Phone Number
                            <input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            />
                        </label>
                        <label>
                            Bio
                            <input
                                type="text"
                                name="bio"
                                value={input.bio}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            />
                        </label>
                        <label>
                            Skills (comma-separated)
                            <input
                                type="text"
                                name="skills"
                                value={input.skills}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            />
                        </label>
                        <label>
                            Resume
                            <input
                                type="file"
                                name="file"
                                
                                // accept="application/pdf"
                                onChange={handleFileChange}
                                className="border rounded w-full p-2"
                            />
                        </label>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default UpdateProfileDialog