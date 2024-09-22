"use client";

import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import Image from "next/image";

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

const JobTable: React.FC = () => {
  const [data, setData] = useState<JobType[]>([]);
  const [open, setOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Fetch job data from the API
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/Jobs/getJob", {
          method: "GET",
        });
        const result = await response.json();
        console.log("----------------------", result);
        const formattedData: JobType[] = result.jobs.map((job: any) => ({
          key: job._id,
          title: job.title,
          company: job.company,
          companyLogo: job.image,
          salary: job.salary,
          experience: job.experience,
          createdAt: new Date(job.createdAt).toLocaleDateString(),
          applicationDeadline: new Date(
            job.applicationDeadline
          ).toLocaleDateString(),
          industry: job.industry,
        }));
        setData(formattedData);
      } catch (error) {
        message.error("Failed to fetch job data");
        console.error("Error:", error);
      }
    };

    fetchJobs();
  }, []);

  const showDeleteConfirm = (id: string) => {
    setJobIdToDelete(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (jobIdToDelete) {
      try {
        const response = await fetch(`/api/Jobs/deleteJob/${jobIdToDelete}`, {
          method: "DELETE",
        });

        if (response.ok) {
          message.success("Job deleted successfully");
          // Refresh the job list after deletion
          setData((prevData) =>
            prevData.filter((job) => job.key !== jobIdToDelete)
          );
        } else {
          message.error("Failed to delete the job");
        }
      } catch (error) {
        message.error("An error occurred while deleting the job");
        console.error("Error:", error);
      }
      setOpen(false);
      setJobIdToDelete(null);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setJobIdToDelete(null);
  };

  const columns: TableProps<JobType>["columns"] = [
    {
      title: "Company Logo",
      dataIndex: "companyLogo",
      key: "companyLogo",
      render: (logo) => (
        <Image
          height={1000}
          width={1000}
          src={logo}
          alt="company-logo"
          className="w-10 h-10 object-contain"
        />
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
        <Space>
          <Button type="primary" icon={<EditOutlined />} />
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table<JobType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 3 }}
        rowKey="key"
      />
      <Modal
        title="Confirm Deletion"
        open={open}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>
    </div>
  );
};

export default JobTable;
