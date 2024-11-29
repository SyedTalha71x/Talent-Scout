"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import './login.css';
import { MdError } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react'; 

const Page = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true);
        toast.info("Processing login...", { autoClose: false }); 

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
                toast.dismiss(); 
                toast.success("Successfully signed in!");
                window.location.reload();
            } else {
                throw new Error(result.message || 'Failed to sign in');
            }
        } catch (error: any) {
            toast.dismiss(); 
            console.error('Error:', error);
            toast.error(error.message || 'Failed to sign in');
            setError(error.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleProviderSignIn = async (provider: string) => {
        try {
            const result = await signIn(provider, {
                callbackUrl: '/',
                redirect: false,
            });

            console.log('Provider sign-in result:', result);

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
        <div className="min-h-screen flex items-center justify-center p-4">
            <ToastContainer />
            <div className="max-w-lg w-full p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                <h3 className="text-gray-800 text-3xl font-extrabold text-center">Login</h3>
                <p className="lg:text-sm md:text-sm sm:text-xs text-xs mt-2 text-gray-800 text-center">
                    Don&apos;t have an account?{' '}
                    <Link href="/Register">
                        <span className="text-blue-600 font-semibold hover:underline">Register here</span>
                    </Link>
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label className="text-gray-800 text-xs block mb-2">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                            className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-sm"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label className="text-gray-800 text-xs block mb-2">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-sm"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <div className='mt-2 flex gap-1.5 items-center text-red-600 text-sm font-semibold'>
                            <MdError className='text-xl text-orange-400' />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        <Link href="/" className="text-blue-600 font-semibold text-sm hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2.5 text-sm rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
