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
    const [imgbbLoading, setImgbbLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { createUser, updateUser, loginWithGoogle, setError, provider } = useAuth();
    const navigate = useNavigate();

    // Just save file on select; no upload here
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const manualPhotoURL = form.photoURL.value || '';
        const password = form.password.value;

        setImgbbLoading(true);

        let photoURL = manualPhotoURL; // default to manual input if no file

        try {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();

                if (data.success) {
                    photoURL = data.data.url; // override with uploaded image URL
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Image uploaded',
                    //     timer: 1200,
                    //     showConfirmButton: false,
                    // });
                } else {
                    throw new Error(data.error.message || 'Image upload failed');
                }
            }

            const userProfile = { displayName: name, photoURL };

            await createUser(email, password);
            await updateUser(userProfile);

            Swal.fire({
                icon: 'success',
                title: 'Account created successfully',
                showConfirmButton: false,
                timer: 1500,
            });

            await fetch('https://sportify-hub-server-nine.vercel.app//users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            });

            navigate('/');
        } catch (error) {
            setError(error.code || error.message);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.message,
                confirmButtonColor: '#d33',
            });
        } finally {
            setImgbbLoading(false);
        }
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

                        fetch('https://sportify-hub-server-nine.vercel.app//users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(userProfile),
                        })
                            .then((res) => res.json())
                            .then((data) => {
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
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 min-h-screen bg-base-200 px-6 py-12  ">
            <title>SportifyHub || Register</title>

            {/* Form Section */}
            <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center  mb-6">Create an Account</h2>

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

                    {/* Photo URL - optional */}
                    {/* <div className="relative">
                        <label className="text-sm text-gray-600">Photo URL (optional)</label>
                        <Image className="absolute left-3 top-10 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="photoURL"
                            className="w-full pl-10 pr-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                            placeholder="Enter your photo URL"
                        />
                    </div> */}

                    {/* Upload image to ImgBB */}
                    <div className="mt-4">
                        <label className="text-sm text-gray-600 block mb-2">Upload Photo</label>

                        <label
                            htmlFor="photo-upload"
                            className="flex items-center gap-2 cursor-pointer border rounded-md px-2 py-2 hover:bg-base-200 transition select-none"
                        >
                            <Image className="text-gray-500" size={20} />
                            <span className="text-gray-400 ">
                                {imgbbLoading ? 'Uploading...' : selectedFile ? selectedFile.name : 'Choose Image'}
                            </span>
                        </label>

                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={imgbbLoading}
                            className="hidden"
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
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
                        disabled={imgbbLoading}
                    >
                        {imgbbLoading ? 'Processing...' : 'Register'}
                    </button>
                </form>

                {/* Google Login */}
                <div className="my-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full border flex items-center justify-center gap-2 py-2 rounded-md hover:bg-base-200 transition"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1024px-Google_Favicon_2025.svg.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
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
