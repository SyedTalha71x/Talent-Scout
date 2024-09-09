"use client";

import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

interface SubscriptionType {
  key: string;
  name: string;
  valid: number;
  price: number;
}

const columns: TableProps<SubscriptionType>["columns"] = [
  {
    title: "Subscription Id",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Subscription Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Valid Till",
    dataIndex: "valid",
    key: "valid",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space>
        <Button type="primary" icon={<EditOutlined />} />
        <Button type="default" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const Page: React.FC = () => {
  const [data, setData] = useState<SubscriptionType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/subscriptions/getSubscription");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const formattedData = result.subscription.map((job: any) => ({
          key: job._id,
          name: job.name,
          valid: job.valid_till,
          price: job.price,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch Subscriptions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl text-gray-800 font-extrabold mb-3">
        Active Subscriptions
      </h1>
      <Table
        pagination={{ pageSize: 2 }}
        columns={columns}
        dataSource={data}
        className="bg-white"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default Page;
