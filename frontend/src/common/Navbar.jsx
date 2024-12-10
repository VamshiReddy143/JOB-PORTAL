import React from 'react';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/admin/companies/create">Create</Link>
                </li>

                <li>
                  <Link to="/admin/jobs/create">Post</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-200">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#6A38C2] text-white px-4 py-2 rounded hover:bg-[#5b30a6]">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={user?.profile?.profilePhoto || '/default-avatar.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="font-medium">{user?.fullname}</span>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:block transition-opacity">
                {user.role === 'student' && (
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <User2 className="inline-block mr-2" />
                    <Link to="/profile">View Profile</Link>
                  </div>
                )}
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={logoutHandler}
                >
                  <LogOut className="inline-block mr-2" />
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
