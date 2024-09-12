"use client";

import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Layout from '../../../../Dashboard/DashboardLayout'

interface DataType {
  key: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const Users: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/Users/getAllUsers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const formattedData = result.map((user: any) => ({
          key: user._id,
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl text-gray-800 font-extrabold mb-3">Database Active Users</h1>
      <Table columns={columns} dataSource={data} className="bg-white" />
    </div>
    </Layout>
  );
};

export default Users;
