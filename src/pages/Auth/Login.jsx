import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { Lock, Mail } from 'lucide-react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import loginLottie from '../../assets/lottie/loginlottie.json';
import { useAuth } from '../../hooks/hooks';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, loginWithGoogle, setError, provider } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                setError(error.code);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                    confirmButtonColor: '#d33'
                });
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle(provider)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in with Google',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                setError(error.code || 'Google login failed');
                Swal.fire({
                    title: 'Google Login Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#d33',
                });
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-center px-4 py-10">
            <title>SportifyHub || Login</title>

            {/* Lottie Animation */}
            <div className="w-full max-w-sm mb-10 md:mb-0 md:mr-10">
                <Lottie animationData={loginLottie} loop={true} />
            </div>

            {/* Login Form */}
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Field */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </span>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                    >
                        Login
                    </button>
                </form>

                {/* Google Login */}
                <div className="relative mt-2">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full border flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1024px-Google_Favicon_2025.svg.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </div>

                {/* Register Redirect */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don’t have an account?{' '}
                    <Link to="/auth/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
