import React, { useState } from 'react';
import { Eye, EyeOff, Image, Lock, Mail, User } from 'lucide-react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/hooks';
import regiLottie from '../../assets/lottie/registerAnim.json';
import Lottie from 'lottie-react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateUser, loginWithGoogle, setError, provider } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        const userProfile = { displayName: name, photoURL };

        createUser(email, password)
            .then(() => {
                updateUser(userProfile)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Account created successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        fetch('http://localhost:3000//users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userProfile)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data)
                            });

                        navigate('/');
                    })
                    .catch((error) => console.error('Profile update error:', error));
            })
            .catch((error) => {
                setError(error.code);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                    confirmButtonColor: '#d33',
                });
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle(provider)
            .then((result) => {
                const user = result.user;
                const userProfile = {
                    name: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                };

                updateUser(userProfile)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Account created successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        fetch('http://localhost:3000//users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userProfile)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data)
                            });

                        navigate('/');
                    })
                    .catch((error) => console.error('Profile update error:', error));
            })
            .catch((error) => {
                setError(error.code || 'Google login failed');
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message,
                    confirmButtonColor: '#d33',
                });
            });
    };

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 min-h-screen bg-gray-50 px-6 py-12">
            <title>SportifyHub || Register</title>

            {/* Form Section */}
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Name */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Name</label>
                        <User className="absolute left-3 top-10 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="name"
                            className="w-full pl-10 pr-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Photo URL</label>
                        <Image className="absolute left-3 top-10 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="photoURL"
                            className="w-full pl-10 pr-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                            placeholder="Enter your photo URL"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Email</label>
                        <Mail className="absolute left-3 top-10 text-gray-400" size={18} />
                        <input
                            type="email"
                            name="email"
                            className="w-full pl-10 pr-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Password</label>
                        <Lock className="absolute left-3 top-10 text-gray-400" size={18} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="w-full pl-10 pr-10 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                            placeholder="Enter your password"
                            required
                            minLength={6}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Must contain at least one number, one lowercase and one uppercase letter"
                        />
                        <span
                            className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                            Must include uppercase, lowercase, number, and be at least 6 characters.
                        </p>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="w-full py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition">
                        Register
                    </button>
                </form>

                {/* Google Login */}
                <div className="my-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 py-2 border text-black bg-white hover:bg-gray-100 rounded-md"
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path fill="#fff" d="M0 0h512v512H0z" /><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" /><path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" /><path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" /><path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" /></g></svg>
                        Continue with Google
                    </button>
                </div>

                {/* Link to Login */}
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* Lottie Section */}
            <div className="hidden md:block w-full max-w-sm">
                <Lottie animationData={regiLottie} loop={true} />
            </div>
        </div>
    );
};

export default Register;
