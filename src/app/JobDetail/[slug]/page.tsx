"use client";
import React, { useEffect, useState } from 'react'
import { PiBriefcaseLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { FaIndustry, FaUserTie, FaMoneyBillWave, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { IconType } from 'react-icons';
import Image from 'next/image';
import Banner from '@/app/Components/Partials/Banner/banner';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface JobDetails {
    industry: string;
    jobLevel: string;
    salary: string;
    experience: string;
    jobType: string;
    deadline: string;
    updated: string;
    location: string;
}

interface JobDetailsTableProps {
    jobDetails: JobDetails;
}

interface DetailItemProps {
    icon: React.ReactElement;
    label: string;
    value: string;
}

const JobDetailsTable: React.FC<JobDetailsTableProps> = ({ jobDetails }) => {
    return (
        <div className="  shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Employment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem icon={<FaIndustry />} label="Industry" value={jobDetails.industry} />
                <DetailItem icon={<FaUserTie />} label="Job level" value={jobDetails.jobLevel} />
                <DetailItem icon={<FaMoneyBillWave />} label="Salary" value={jobDetails.salary} />
                <DetailItem icon={<MdWorkHistory />} label="Experience" value={jobDetails.experience} />
                <DetailItem icon={<PiBriefcaseLight />} label="Job type" value={jobDetails.jobType} />
                <DetailItem icon={<FaCalendarAlt />} label="Deadline" value={jobDetails.deadline} />
                <DetailItem icon={<BsClockHistory />} label="Updated" value={jobDetails.updated} />
                <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={jobDetails.location} />
            </div>
        </div>
    );
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
    return (
        <div className="flex items-center">
            <span className="mr-2 text-2xl text-gray-600">{icon}</span>
            <div className='mt-3'>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-semibold text-gray-700">{value}</p>
            </div>
        </div>
    );
}

const CompanyDescription: React.FC = () => {
    return (
        <div className="flex flex-col mt-12">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Welcome to Microsoft Team</h2>
                <p className="text-gray-600">
                    The AliStudio Design team has a vision to establish a trusted platform that enables productive and healthy enterprises in a world of digital and remote everything, constantly changing work patterns and norms, and the need for organizational resiliency.

                    The ideal candidate will have strong creative skills and a portfolio of work which demonstrates their passion for illustrative design and typography. This candidate will have experiences in working with numerous different design platforms such as digital and print forms.
                </p>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-700 mt-6">Essential Knowledge, Skills, and Experience</h2>
                <ul className="text-gray-600 list-disc list-inside">
                    <li>A portfolio demonstrating well-thought-through and polished end-to-end customer journeys</li>
                    <li>5+ years of industry experience in interactive design and/or visual design</li>
                    <li>Excellent interpersonal skills</li>
                    <li>Aware of trends in mobile, communications, and collaboration</li>
                    <li>Ability to create highly polished design prototypes, mockups, and other communication artifacts</li>
                    <li>The ability to scope and estimate efforts accurately and prioritize tasks and goals independently</li>
                    <li>History of impacting shipping products with your work</li>
                    <li>A Bachelor’s Degree in Design (or related field) or equivalent professional experience</li>
                    <li>Proficiency in a variety of design tools such as Figma, Photoshop, Illustrator, and Sketch</li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-700 mt-6">Preferred Experience</h2>
                <ul className="text-gray-600 list-disc list-inside">
                    <li>Designing user experiences for enterprise software / services</li>
                    <li>Creating and applying established design principles and interaction patterns</li>
                    <li>Aligning or influencing design thinking with teams working in other geographies</li>
                </ul>
            </div>
            <div className='mt-10'>
                <hr className='w-full' />
            </div>
            <div className='mt-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3'>
                        <button className='bg-purple-600 text-white rounded-md py-2 text-sm px-6 nav-btns'>Apply Now</button>
                        <button className='bg-purple-600 text-white rounded-md py-2 text-sm px-6 nav-btns'>Save Job</button>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

interface SimilarJob {
    companyImage: string;
    title: string;
    role: string;
    jobType: string;
    location: string;
    salary: string;
}

const SimilarJobs: React.FC = () => {
    const similarJobs: SimilarJob[] = [
        {
            companyImage: "https://images.pexels.com/photos/434346/pexels-photo-434346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Frontend Developer",
            role: "Junior",
            jobType: "Full Time",
            location: "California USA",
            salary: "$4,000 / month"
        },
        {
            companyImage: "https://images.pexels.com/photos/9683980/pexels-photo-9683980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Backend Engineer",
            role: "Mid-Level",
            jobType: "Part Time",
            location: "New York, NY",
            salary: "$50 / hour"
        },
        {
            companyImage: "https://images.pexels.com/photos/218717/pexels-photo-218717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "DevOps Engineer",
            role: "Senior",
            jobType: "Contract",
            location: "San Francisco, CA",
            salary: "$80 / hour"
        },
        {
            companyImage: "https://images.pexels.com/photos/19673889/pexels-photo-19673889/free-photo-of-amazon-cardboard-doll-with-christmas-boxes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "UI/UX Designer",
            role: "Mid-Level",
            jobType: "Full Time",
            location: "Austin, TX",
            salary: "$5,000 / month"
        },
        {
            companyImage: "https://images.pexels.com/photos/19673889/pexels-photo-19673889/free-photo-of-amazon-cardboard-doll-with-christmas-boxes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "UI/UX Designer",
            role: "Mid-Level",
            jobType: "Full Time",
            location: "Austin, TX",
            salary: "$5,000 / month"
        },
        {
            companyImage: "https://images.pexels.com/photos/19673889/pexels-photo-19673889/free-photo-of-amazon-cardboard-doll-with-christmas-boxes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "UI/UX Designer",
            role: "Mid-Level",
            jobType: "Full Time",
            location: "Austin, TX",
            salary: "$5,000 / month"
        },
        {
            companyImage: "https://images.pexels.com/photos/19673889/pexels-photo-19673889/free-photo-of-amazon-cardboard-doll-with-christmas-boxes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "UI/UX Designer",
            role: "Mid-Level",
            jobType: "Full Time",
            location: "Austin, TX",
            salary: "$5,000 / month"
        },
        {
            companyImage: "https://images.pexels.com/photos/19673889/pexels-photo-19673889/free-photo-of-amazon-cardboard-doll-with-christmas-boxes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "UI/UX Designer",
            role: "Mid-Level",
            jobType: "Full Time",
            location: "Austin, TX",
            salary: "$5,000 / month"
        }
    ];

    return (
        <div className=" shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Similar Jobs</h2>
            <div className="grid grid-cols-1 gap-4 mt-10">
                {similarJobs.map((job, index) => (
                    <div key={index} className=" border-b pb-4">
                        <div className='flex gap-4'>
                            <div>
                                <Image height={1000} width={1000} src={job.companyImage} alt={job.title} className="w-10 h-10 rounded-2xl" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h3 className="font-semibold text-gray-700">{job.title}</h3>
                                <div className='flex gap-3'>
                                    <p className="text-sm text-gray-500">{job.role}</p>
                                    <p className="text-sm text-gray-500">{job.jobType}</p>
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center mt-5 justify-between">
                            <p className="text-sm text-gray-500">{job.salary}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

const Page: React.FC = () => {
    // const [data, setdata] = useState([])
    const { id } = useParams();
    const [data, setData] = useState<JobDetails | null>(null);
    useEffect(() => {
        const fetchdata = async (id: string | string[] | undefined) => {
            try {
                const response = await axios.get(`http://localhost:3000/api/Jobs/find/${id}`);
                setData(response.data)
                console.log("Data------------", response.data)
            }
            catch (error: any) {
                console.log("error-------------------", error);
            }
        }
        fetchdata(id);
    }, [])

    const jobDetails: JobDetails = {
        industry: "Software Development",
        jobLevel: "Senior",
        salary: "$120,000 - $160,000",
        experience: "5+ years",
        jobType: "Full Time",
        deadline: "30/08/2024",
        updated: "20/07/2024",
        location: "Remote (USA)"
    };

    return (
        <>
            <div className='w-[80%] mx-auto'>
                <div className='flex justify-between items-center mt-[4%]'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex'>
                            <div>
                                <Image src="https://images.pexels.com/photos/9683980/pexels-photo-9683980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company Logo" width={50} height={50} className="rounded-full h-16 w-16 object-cover mr-3" />
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-bold text-gray-700'>Senior Full Stack Engineer</h1>
                                <div className='flex items-center gap-5 mt-1'>
                                    <div className='flex gap-1'>
                                        <PiBriefcaseLight className='text-lg text-gray-600' />
                                        <span className='text-sm text-gray-600'>Full Time</span>
                                    </div>
                                    <div className='flex gap-1'>
                                        <CiClock2 className='text-lg text-gray-600' />
                                        <span className='text-sm text-gray-600'>4 mins ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <button className='py-2 px-8 rounded-md text-white nav-btns bg-purple-600'>Apply Now</button>
                </div>
                <hr className='bg-gray-900 h-[1px] w-full mt-10' />
                <div className="flex flex-col lg:flex-col gap-8">
                    <div>
                        <div className='flex gap-5'>
                            <div className="lg:w-2/3">
                                <JobDetailsTable jobDetails={jobDetails} />
                                <div className="mt-4">
                                    <CompanyDescription />
                                </div>
                            </div>

                            <div className="lg:w-1/3">
                                <SimilarJobs />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Banner />
        </>
    )
}

export default Page;
