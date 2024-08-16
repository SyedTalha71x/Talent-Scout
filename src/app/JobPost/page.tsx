import React from 'react';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Post a Job",
    description: "Post a job and hire your best candidates"
}

const Page = () => {
    return (
        <div>
            <div className='relative bg-cover bg-center' style={{ backgroundImage: "url('/bg-jobpost.jpg')" }}>
                <div className='absolute inset-0 bg-slate-600 opacity-75'></div>
                <div className='relative flex justify-center items-center text-center flex-col p-36'>
                    <h1 className='text-white lg:text-5xl md:text-4xl sm:text-2xl text-2xl font-bold'>Post a Job</h1>
                </div>
            </div>
            <div className='flex justify-center items-center p-8 mt-10'>
                <form className='bg-white p-10 rounded-lg shadow-xl max-w-4xl w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='jobTitle'>
                                Job Title
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='jobTitle'
                                type='text'
                                placeholder='Enter job title'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='jobCategory'>
                                Job Category
                            </label>
                            <select
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='jobCategory'

                            >
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='jobType'>
                                Job Type
                            </label>
                            <select
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='jobType'
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='salaryType'>
                                Salary Type
                            </label>
                            <select
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='salaryType'
                            >
                                <option>Hourly</option>
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='salary'>
                                Salary
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='salary'
                                type='number'
                                placeholder='Enter salary'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='skills'>
                                Skills
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='skills'
                                type='text'
                                placeholder='Enter required skills'
                            />
                        </div>
                        <div className='md:col-span-2'>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='jobDescription'>
                                Job Description
                            </label>
                            <textarea
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='jobDescription'
                                placeholder='Enter job description'
                                rows={5}
                            ></textarea>
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='companyLogo'>
                                Company Logo
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='companyLogo'
                                type='file'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='country'>
                                Country
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='country'
                                type='text'
                                placeholder='Enter country'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm outline-none font-bold mb-2' htmlFor='jobArrivalsCategory'>
                                Job Arrivals Category
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm outline-none'
                                id='jobArrivalsCategory'
                                type='text'
                                placeholder='Enter job arrivals category'
                            />
                        </div>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <button
                            className='bg-purple-600 nav-btns text-sm outline-none text-white py-2 px-8 rounded-md'
                            type='button'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Page;
