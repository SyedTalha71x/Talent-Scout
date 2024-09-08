"use client";

import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

interface JobType {
  key: string;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  experience: string;
  createdAt: string;
  applicationDeadline: string;
  industry: string;
}

const columns: TableProps<JobType>["columns"] = [
  {
    title: "Company Logo",
    dataIndex: "companyLogo",
    key: "companyLogo",
    render: (logo) => (
      <img src={logo} alt="company-logo" className="w-10 h-10 object-contain" />
    ),
  },
  {
    title: "Job Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Application Deadline",
    dataIndex: "applicationDeadline",
    key: "applicationDeadline",
  },
  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" icon={<EditOutlined />} />
        <Button type="default" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const JobsTableComponent: React.FC = () => {
  const [data, setData] = useState<JobType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/Jobs/getJob");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const formattedData = result.jobs.map((job: any) => ({
          key: job._id,
          title: job.title,
          company: job.company,
          companyLogo: job.image, 
          salary: `$${job.salary.toLocaleString()}`, 
          experience: `${job.experience} years`,
          createdAt: new Date(job.createdAt).toLocaleDateString(),
          applicationDeadline: new Date(job.applicationDeadline).toLocaleDateString(),
          industry: job.industry,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl text-gray-800 font-extrabold mb-3">Job Listings</h1>
      <Table columns={columns} dataSource={data} className="bg-white" scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default JobsTableComponent;
