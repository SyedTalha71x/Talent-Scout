"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import './login.css';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { signIn } from 'next-auth/react'; // Import signIn from next-auth/react

const Page = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true);
        toast.info("Processing login...", { autoClose: false }); // Show loading toast

        try {
            const response = await fetch('/api/authentication/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('Token', result.data.token);
                toast.dismiss(); // Dismiss loading toast
                toast.success("Successfully signed in!");
                router.push("http://localhost:3000")
                window.location.reload();
            } else {
                throw new Error(result.message || 'Failed to sign in');
            }
        } catch (error: any) {
            toast.dismiss(); // Dismiss loading toast
            console.error('Error:', error);
            toast.error(error.message || 'Failed to sign in');
            setError(error.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleProviderSignIn = async (provider: string) => {
        try {
            // Attempt sign-in with the specified provider
            const result = await signIn(provider, {
                callbackUrl: '/',
                redirect: false, // Prevent automatic redirection
            });

            // Log the result to the console
            console.log('Provider sign-in result:', result);

            // If needed, handle custom logic here after signIn
            if (result?.error) {
                toast.error(`Sign-in error: ${result.error}`);
            } else if (result?.url) {
                console.log(`Redirecting to: ${result.url}`);
            }
        } catch (error) {
            console.error('Provider sign-in error:', error);
            toast.error('Failed to sign in with provider');
        }
    };


    return (
        <div className="">
            <ToastContainer />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    <div className="md:max-w-md w-full px-4 py-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8">
                                <h3 className="text-gray-800 text-3xl font-extrabold">Login</h3>
                                <p className="text-sm mt-4 text-gray-800">
                                    Don&apos;t have an account{' '}
                                    <Link href="/Register" passHref>
                                        <span className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                                            Register here
                                        </span>
                                    </Link>
                                </p>
                            </div>

                            <div>
                                <label className="text-gray-800 text-xs block mb-2">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        type="text"
                                        required
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-sm"
                                        placeholder="Enter email"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                            <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="text-gray-800 text-xs block mb-2">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-sm"
                                        placeholder="Enter password"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className='mt-2 flex gap-1.5'>
                                {error && <MdError className='text-xl text-orange-400' />}
                                {error && <span className='text-red-600 text-sm font-semibold'>{error}</span>}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                                <div>
                                    <Link href="/" className="text-blue-600 font-semibold text-sm hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className={`w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>

                            <div className="lg:flex lg:justify-center lg:flex-row md:flex md:justify-center md:flex-row sm:flex sm:justify-center sm:flex-col flex justify-center flex-col gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => handleProviderSignIn('google')}
                                    className="border-none outline-none bg-orange-400 hover:bg-orange-600 transition-all duration-700 py-2 px-8 rounded-md"
                                    disabled={loading}
                                >
                                    <FaGoogle className='text-2xl text-white m-auto' />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleProviderSignIn('facebook')}
                                    className="border-none outline-none bg-blue-600 hover:bg-blue-800 transition-all duration-700 py-2 px-8 rounded-md"
                                    disabled={loading}
                                >
                                    <FaFacebookF className='text-2xl text-white m-auto' />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="md:h-full lg:h-full sm:h-full h-full ">
                        <Image height={1000} width={1000} src="https://images.pexels.com/photos/443399/pexels-photo-443399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover rounded-lg login-image" alt="login-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
