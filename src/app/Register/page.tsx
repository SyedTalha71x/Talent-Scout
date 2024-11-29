"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import './register.css'
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { MdError } from "react-icons/md";

const Page = () => {
  const router = useRouter();
  const [error, seterror] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      seterror("Email is invalid");
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      seterror("Password Length must be of 8 Characters");
      return;
    }
    const toastId = toast.loading("Registering...");
    try {
      const response = await fetch('/api/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Success:', result);
        toast.update(toastId, { render: "Successfully Registered", type: "success", isLoading: false, autoClose: 2000 });
        setTimeout(() => {
          router.push('/Login')
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to register');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.update(toastId, { render: "Failed to Register", type: "error", isLoading: false, autoClose: 2000 });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ToastContainer />
      <div className="max-w-lg w-full lg:p-6 md:p-6 sm:p-3 p-3 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="w-full px-4 py-4">
          <form>
            <div className="mb-8">
              <h3 className="text-gray-800 text-center text-3xl font-extrabold">Register</h3>
              <p className="lg:text-sm md:text-sm sm:text-xs text-xs mt-4 text-gray-800">Already have an account <Link href="/Login" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</Link></p>
            </div>

            <div>
              <label className="text-gray-800 text-xs block mb-2">Name</label>
              <div className="relative flex items-center">
                <input onChange={handleChange} value={formData.name} name="name" type="text" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Name" />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-xs block mb-2 mt-4">Email</label>
              <div className="relative flex items-center">
                <input onChange={handleChange} value={formData.email} name="email" type="text" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />
              </div>
            </div>

            <div className="mt-8">
              <label className="text-gray-800 text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input onChange={handleChange} value={formData.password} name="password" type="password" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
              </div>
            </div>
            <div className='mt-2 flex gap-1.5'>
              {error && <MdError className='text-xl text-orange-400' />}
              {error && <span className='text-red-600 text-sm font-semibold'>{error}</span>}
            </div>

            <div className="mt-6">
              <button type="button" onClick={handleSubmit} className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page;
