"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Page: React.FC = () => {
    const [loggedin, setLoggedin] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window is available
            const token = localStorage.getItem('Token');
            setLoggedin(!!token);
        }
    }, []);

    return (
        <div className="">
            <div className='hidden lg:block'>
                {(
                    <button type="button" className='text-sm ml-2 bg-purple-600 text-white py-2 px-8 rounded-md nav-btns'>
                        <Link href={"/"}>
                            Dashboard
                        </Link>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Page;
