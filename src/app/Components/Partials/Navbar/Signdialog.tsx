"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const Signin: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        // Check authentication state on component mount
        const token = localStorage.getItem('Token');
        if (token && status === 'authenticated') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('Token');
        setIsLoggedIn(false);  // Update state to reflect logout
        router.push('/');  // Redirect to home or desired page
    };

    return (
        <div className="">
            <div className='hidden lg:block'>
                {isLoggedIn ? (
                    <button
                        onClick={logout}
                        type="button"
                        className='text-sm bg-purple-600 text-white py-2 px-8 rounded-md nav-btns font-medium'
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        type="button"
                        className='text-sm bg-purple-600 text-white py-2 px-8 rounded-md nav-btns font-medium'
                    >
                        <Link href="/Login">
                            Log In
                        </Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Signin;
