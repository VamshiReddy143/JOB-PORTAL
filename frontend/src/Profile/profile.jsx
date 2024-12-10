// Profile Component
import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { Contact, Mail, Pen } from 'lucide-react';
import AppliedJobTable from './AppliedJobTable';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import UpdateProfileDialog from './UpdateProfileDialog';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const isResumeAvailable = Boolean(user?.profile?.resume);

    return (
        <div>
            <Navbar />
            {/* Profile Information Section */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src={user?.profile?.profilePhoto}
                            alt="profile"
                            className="h-24 w-24 rounded-full border"
                        />
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            <p>{user?.profile?.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <Pen />
                        Edit
                    </button>



        
                </div>

                {/* Contact Information */}
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email || 'Email not provided'}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber || 'Phone number not provided'}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex flex-wrap items-center gap-1">
                        {user?.profile?.skills?.length ? (
                            user.profile.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 px-2 py-1 rounded-md border"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label className="text-md font-bold">Resume</label>
                    {isResumeAvailable ? (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user.profile.resume}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            {user.profile.resumeOriginalName}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Update Profile Section */}
            {open && <UpdateProfileDialog setOpen={setOpen} />}
        </div>
    );
};

export default Profile;

