"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import './register.css'
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { MdError } from "react-icons/md";
import Image from 'next/image';

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
          router.push('http://localhost:3000/Login')
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
    <div className="">
      <ToastContainer />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form >
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Register</h3>
                <p className="text-sm mt-4 text-gray-800">Already have an account <Link href="/Login" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</Link></p>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">Name</label>
                <div className="relative flex items-center">
                  <input onChange={handleChange} value={formData.name} name="name" type="name" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Name" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>


              <div>
                <label className="text-gray-800 text-xs block mb-2 mt-4">Email</label>
                <div className="relative flex items-center">
                  <input onChange={handleChange} value={formData.email} name="email" type="text" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input onChange={handleChange} value={formData.password} name="password" type="password" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
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

              <div className=" lg:flex lg:justify-center  lg:flex-row md:flex md:justify-center md:flex-row sm:flex sm:justify-center sm:flex-col flex justify-center flex-col gap-4  mt-6">
                <button type="button"
                  className="border-none outline-none bg-orange-400 hover:bg-orange-600 transition-all duration-700  py-2 px-8 rounded-md">
                  <FaGoogle className='text-2xl text-white   m-auto  ' />
                </button>
                <button type="button"
                  className="border-none outline-none bg-blue-600 hover:bg-blue-800 transition-all duration-700  py-2 px-8 rounded-md">
                  <FaFacebookF className='text-2xl text-white  m-auto ' />
                </button>
                <button type="button"
                  className="border-none outline-none bg-black hover:bg-[#323232] transition-all duration-700  py-2 px-8 rounded-md">
                  <FaGithub className='text-2xl text-white m-auto  ' />
                </button>
              </div>
            </form>
          </div>

          <div className="md:h-full lg:h-full sm:h-full h-full ">
            <Image height={1000} width={1000} src="https://images.pexels.com/photos/443399/pexels-photo-443399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover rounded-lg signup-image" alt="login-image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page