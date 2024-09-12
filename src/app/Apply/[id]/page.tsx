"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadChangeParam, RcFile } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { PiBriefcaseLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";

const JobApplyForm: React.FC = () => {
  const [form] = useForm();
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<RcFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const port = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const apiUrl = `${port}/api/Jobs/singleJob/${id}`;

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

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div>No job data available</div>;
  }

  const handleSubmit = async (values: any) => {
    setLoading(true);

    // Prepare JSON data for API submission
    const jsonData = {
      jobId: id,
      name: values.name,
      email: values.email,
      phoneNo: values.phone,
      currentPosition: values.currentPosition || "",
      currentSalary: values.currentSalary || "",
      coverLetter: coverLetter,
    };

    const Token = localStorage.getItem("Token");

    try {
      // Send JSON data to the API
      await axios.post("/api/Jobs/applyJob", jsonData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      message.success("Application submitted successfully");

      // Handle file uploads separately if needed
      if (resumeFile) {
        const formData = new FormData();
        if (resumeFile) formData.append("resume", resumeFile);
        await axios.post("/api/Jobs/uploadFiles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    } catch (error) {
      message.error("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handleResumeChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      setResumeFile(info.file.originFileObj as RcFile);
    }
  };


  return (
    <>
      <div>
        <div
          className="relative bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-jobpost.jpg')" }}
        >
          <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
          <div className="relative flex justify-center items-center text-center flex-col lg:p-36 md:p-26 sm:p-20 p-16">
            <h1 className="text-white sm:text-3xl text-2xl font-extrabold title-font">
              Apply for the job
            </h1>
            <p className="text-base leading-relaxed xl:w-full lg:w-full w-full mx-auto text-gray-300 mt-1">
              Apply for the job and best of luck!
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl mb-5 uppercase mt-10 font-extrabold text-gray-700">
            Job you are applying for
          </h1>
          <hr />
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
          </div>
        </div>
        <div className="p-6 max-w-7xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="currentPosition"
                label="Current Position (Optional)"
              >
                <Input />
              </Form.Item>

              <Form.Item name="currentSalary" label="Current Salary (Optional)">
                <Input />
              </Form.Item>
            </div>

            <Form.Item label="Cover Letter" className="mt-4">
              <ReactQuill
                value={coverLetter}
                onChange={(value) => setCoverLetter(DOMPurify.sanitize(value))}
                className="border rounded-lg"
              />
            </Form.Item>

            <Form.Item label="Resume" className="mt-4">
              <Upload
                beforeUpload={(file) => {
                  const isValidType = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ].includes(file.type);
                  if (!isValidType) {
                    message.error("You can only upload PDF or DOC/DOCX files!");
                  }
                  return isValidType;
                }}
                onChange={handleResumeChange}
                maxCount={1}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Resume</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Submit Application
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default JobApplyForm;