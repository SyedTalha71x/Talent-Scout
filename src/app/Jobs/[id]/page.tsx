"use client";
import React, { useEffect, useState } from "react";
import { PiBriefcaseLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import {
  FaIndustry,
  FaUserTie,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/app/Components/Partials/Banner/banner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import JobApplyForm from '../../Apply/[id]/page'

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

interface CompanyDescriptionProps {
  briefDescription: string;
}

const JobDetailsTable: React.FC<JobDetailsTableProps> = ({ jobDetails }) => {
  return (
    <div className="  shadow-md rounded-lg lg:p-6 md:p-5 sm:p-4 p-4 w-full mt-8">
      <h2 className="lg:ext-2xl md:text-xl sm:text-xl text-lg font-bold mb-4 text-gray-700">
        Employment Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem
          icon={<FaIndustry />}
          label="Industry"
          value={jobDetails.industry}
        />
        <DetailItem
          icon={<FaUserTie />}
          label="Job level"
          value={jobDetails.jobLevel}
        />
        <DetailItem
          icon={<FaMoneyBillWave />}
          label="Salary"
          value={jobDetails.salary}
        />
        <DetailItem
          icon={<MdWorkHistory />}
          label="Experience"
          value={jobDetails.experience}
        />
        <DetailItem
          icon={<PiBriefcaseLight />}
          label="Job type"
          value={jobDetails.jobType}
        />
        <DetailItem
          icon={<FaCalendarAlt />}
          label="Deadline"
          value={jobDetails.deadline}
        />
        <DetailItem
          icon={<BsClockHistory />}
          label="Updated"
          value={jobDetails.updated}
        />
        <DetailItem
          icon={<FaMapMarkerAlt />}
          label="Location"
          value={jobDetails.location}
        />
      </div>
    </div>
  );
};

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-2xl text-gray-600">{icon}</span>
      <div className="mt-3">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
};

const CompanyDescription: React.FC<CompanyDescriptionProps> = ({
  briefDescription,

}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const styleHtmlContent = (html: string): string => {
    // Basic styling for headings, paragraphs, and lists
    return html
      .replace(/<h1>/g, '<h1 class="text-2xl font-bold mb-4 text-gray-700">')
      .replace(/<\/h1>/g, "</h1>")
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold mb-4 text-gray-700">')
      .replace(/<\/h2>/g, "</h2>")
      .replace(/<h3>/g, '<h3 class="text-2xl font-bold mb-4 text-gray-700">')
      .replace(/<\/h3>/g, "<h3>")
      .replace(/<p>/g, '<p class="text-base text-gray-700 mb-4">')
      .replace(/<\/p>/g, "</p>")
      .replace(
        /<li>/g,
        '<li class="text-base mt-1 text-gray-600 list-disc pl-5">'
      )
      .replace(/<\/li>/g, "</li>")
      .replace(/<ul>/g, '<ul class="list-disc pl-5 mb-4">')
      .replace(/<\/ul>/g, "</ul>");
  };

  const styledHtml = styleHtmlContent(briefDescription);
  // Sanitize the styled HTML content
  const sanitizedHtml = DOMPurify.sanitize(styledHtml);

  return (
    <div className="flex flex-col mt-12 space-y-6">
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      <div className="mt-10">
        <hr className="w-full border-gray-300" />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button className="bg-purple-600 text-white rounded-md py-2 text-sm px-6">
          Save Job
        </button>
      </div>
    </div>
  );
};

interface SimilarJob {
  companyImage: string;
  title: string;
  role: string;
  jobType: string;
  location: string;
  salary: string;
}

const SimilarJobs: React.FC = () => {
  const [similarJobs, setSimilarJobs] = useState<SimilarJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const port = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { id } = useParams();
  const router = useRouter();

  const redirectToDynamicRoute = (id: any) => {
    router.push(`${id}`);
  };

  useEffect(() => {
    // Fetch similar jobs when component mounts
    async function fetchSimilarJobs() {
      try {
        const response = await axios.get(`${port}/api/Jobs/similarJobs/${id}`);
        setSimilarJobs(response.data.similarJobs);
      } catch (err) {
        setError("Error fetching similar jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchSimilarJobs();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="shadow-md rounded-lg lg:p-6 md:p-4 sm:p-4 p-4 mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Similar Jobs</h2>
      <div className="grid grid-cols-1 gap-4 mt-10">
        {similarJobs.map((job: any, index: any) => (
          <div
            key={index}
            className="border-b pb-4"
            onClick={() => {
              redirectToDynamicRoute(job._id);
            }}
          >
            <div className="flex gap-4">
              <div>
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-10 h-10 rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-700">{job.title}</h3>
                <div className="flex  gap-3">
                  <p className="text-sm text-gray-500">{job.role}</p>
                  <p className="text-sm text-gray-500">{job.jobType}</p>
                </div>
              </div>
            </div>
            <div className=" lg:flex-row md:flex md:flex-row sm:flex-col sm:flex flex flex-col gap-2 mt-5 justify-between">
              <p className="text-sm text-gray-500">
                {job.salary > 100000
                  ? job.salary / 1000 + "K$ Monthly"
                  : job.salary + "$ Hour"}
              </p>{" "}
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null); // Updated to accept an object or null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const port = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const apiUrl = `${port}/api/Jobs/singleJob/${id}`;
   const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(apiUrl);
        setData(response.data.document); // Store the document object directly
        console.log("API Response:", response.data.document);
      } catch (error: any) {
        console.error("Error fetching job data:", error);
        setError(error.message || "An error occurred while fetching job data");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  const briefDescription = data?.briefDescription || "No description available";

  const jobDetails: JobDetails = {
    industry: data?.industry || "N/A",
    jobLevel: data?.experienceLevel || "N/A",
    salary: `$${data?.salary.toLocaleString() || "N/A"}`,
    experience: `${data?.experience}+ years`,
    jobType: data?.jobType || "N/A",
    deadline: new Date(data?.applicationDeadline).toLocaleDateString() || "N/A",
    updated: new Date(data?.createdAt).toLocaleDateString() || "N/A",
    location: data?.location || "N/A",
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div>No job data available</div>;
  }

   const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
      <div className="w-[80%] mx-auto lg:mt-[6%] md:mt-[6%] sm:mt-[5%] mt-[5%]">
        <div className="flex justify-between items-center mt-[4%]">
          <div className="flex flex-col gap-2">
            <div className="flex">
              <div className="lg:block md:block sm:block hidden">
                <img
                  src={data.image}
                  alt="Company Logo"
                  className="rounded-full h-16 w-16 object-cover mr-3"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-gray-800">
                  {data.title}
                </h1>
                <div className="flex items-center gap-5 lg:mt-1 md:mt-2 sm:mt-3 mt-3">
                  <div className="flex gap-1">
                    <PiBriefcaseLight className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {data.jobType}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <CiClock2 className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {new Date(data.createdAt).toISOString().split("T")[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href={`/Apply/${data._id}`}>
          <button className="py-2 px-8 lg:block sm:hidden md:hidden hidden rounded-md text-white nav-btns bg-purple-600">
            Apply Now
          </button>
          </Link>
        </div>
        <hr className="bg-gray-900 h-[1px] w-full mt-10" />
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="lg:w-2/3 w-full">
            <JobDetailsTable jobDetails={jobDetails} />
            <div className="mt-4">
              <CompanyDescription briefDescription={briefDescription}  />
            </div>
          </div>

          <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
            <SimilarJobs />
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Page;
