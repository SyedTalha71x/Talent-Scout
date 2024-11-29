"use client";
import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { PiBriefcaseLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import axios from "axios";
import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import filters from "@/utils/sampleJson/filters.json";

const itemsPerPage = 5;

const Page = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/Jobs/getJob");
        setJobs(response.data.jobs);
      } catch (error: any) {
        console.log("Error fetching jobs", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const currentJobs = jobs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-jobpost.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
        <div className="relative flex justify-center items-center text-center flex-col lg:p-36 md:p-26 sm:p-20 p-16">
          <h1 className="text-white lg:text-5xl md:text-4xl sm:text-2xl w-full text-2xl font-bold">
            Find your Dream Job
          </h1>
          <p className="text-gray-300 mt-1 text-lg w-full">
            Discover Your Path to Success: Find Your Dream Job Today!
          </p>
        </div>
      </div>
      <div className="mt-[3%]">
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="lg:text-4xl md:text-3xl sm:text-xl text-xl font-bold tracking-tight text-gray-700">
              Find your Dream Job
            </h1>

            <div className="flex items-center">
              <span className="text-[15px] font-medium text-blue-900">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                    defaultOpen={true}
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
              <div className="lg:col-span-3">
                {currentJobs.map((job: any, index: any) => (
                  <Link key={index} href={`/Jobs/${job._id}`}>
                    <div className=" rounded-lg shadow-md bg-slate-100 p-5 mb-6 transition-all cursor-pointer duration-500 hover:bg-blue-100">
                      <div className="flex gap-3 justify-start items-start">
                        <div>
                          <Image
                          height={1000}
                          width={1000}
                            src={job.image}
                            className="rounded-xl h-16 w-16 object-cover"
                            alt="Company"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-lg font-bold text-blue-950">
                            {job.company}
                          </h1>
                          <div className="flex mt-0.5">
                            <CiLocationOn />
                            <div className="text-[12px] text-gray-500">
                              {job.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h1 className="text-lg text-violet-950 font-bold">
                          {job.title}
                        </h1>
                      </div>
                      <div className="flex items-center gap-5 mt-2">
                        <div className="flex gap-0.5">
                          <PiBriefcaseLight />
                          <div className="text-[13px] text-gray-500">
                            {job.jobType}
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          <CiClock2 />
                          <div className="text-[13px] text-gray-500">
                            {job.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <p className="text-sm text-gray-500">
                          {job.description}
                        </p>
                      </div>
                      <div className="mt-5 flex items-center gap-2">
                        {job.skills.slice(0, 4).map((skill: any, idx: any) => (
                          <div
                            key={idx}
                            className="bg-slate-200 rounded-md py-1.5 px-4 text-gray-700 text-[12px]"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex">
                          <span className="text-purple-800 font-bold text-[20px]">
                            ${job.salary}/
                          </span>
                          <div className="text-gray-600 text-[16px] ml-0.5 mt-1">
                            Hour
                          </div>
                        </div>
                        <button className="bg-purple-600 text-white rounded-md py-2 px-6 text-sm nav-btns">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="flex justify-between mt-2 ">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="bg-blue-900 cursor-pointer  text-sm text-white py-2 px-8 rounded-md nav-btns disabled:bg-purple-100"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="bg-blue-900 cursor-pointer text-sm text-white py-2 px-8 rounded-md nav-btns"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
