import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105">
                <h2 className="text-center text-3xl font-bold text-gray-900">Welcome Back!</h2>
                <p className="text-center text-gray-500 mb-6">Please login to your account</p>
                <form className="space-y-6" onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={input.email}
                                onChange={changeEventHandler}
                                className="block w-full px-4 py-3 mt-1 border outline-none text-white border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="yourname@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={input.password}
                                onChange={changeEventHandler}
                                className="block w-full  px-4 py-3 mt-1 border outline-none text-white border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Your password"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            {/* <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <label htmlFor="student" className="ml-2 text-sm text-gray-600">Student</label>
                            </div> */}


                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text text-black">Recuiter</span>
                                    <input type="checkbox" name='role' value="recruiter" checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler} defaultChecked className="checkbox border-black" />
                                </label>
                            </div>


                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text text-black">student</span>
                                    <input type="checkbox" name='role' value="student" checked={input.role === 'student'}
                                    onChange={changeEventHandler} defaultChecked className="checkbox border-black" />
                                </label>
                            </div>



                            {/* <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="h-4 w-4 text-indigo-600  border-gray-300 focus:ring-indigo-500"
                                />
                                <label htmlFor="recruiter" className="ml-2 text-sm text-gray-600">Recruiter</label>
                            </div> */}
                        </div>
                    </div>

                    {loading ? (
                        <button type="button" className="w-full py-3 px-6 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
                            <Loader2 className="animate-spin mr-2 h-5 w-5" /> Logging in...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                        >
                            Login
                        </button>
                    )}
                </form>
                <div className="text-center mt-4">
                    <span className="text-sm text-gray-600">Don't have an account? </span>
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;