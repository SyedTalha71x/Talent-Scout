"use client";

import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

interface SubscriptionType {
  key: string;
  name: string;
  valid: number;
  price: number;
}

const Page: React.FC = () => {
  const [data, setData] = useState<SubscriptionType[]>([]);
  const [open, setopen] = useState(false);
  const [subIdToDelete, setsubIdToDelete] = useState<string | null>(null);

  const showDeleteConfirmation = (id: string) => {
    setsubIdToDelete(id);
    setopen(true);
  };
  const handleDelete = async () => {
    if(subIdToDelete){
      try{
        const response = await fetch(`/api/subscriptions/deleteSubscription/${subIdToDelete}`, {
          method: 'DELETE'
        })
        if(response.ok){
          message.success('Subscription has been deleted')

          setData((prevData)=>{
            return prevData.filter((subscription) => { subscription.key !== subIdToDelete; });
          })
        }
        else
        {
          message.error('Failed to Delete the Subscription')
        }
      }
      catch(error){
        console.log(error);
        message.error("An error occurred while deleting the Subscription");
        console.error("Error:", error);
      }
      setopen(false);
      setsubIdToDelete(null);

    }
  };
  const handleCancel = () => {
    setopen(false)
    setsubIdToDelete(null);

  };

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
          <Button
            type="default"
            onClick={() => {
              showDeleteConfirmation(record.key);
            }}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

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
      <Modal
        title="Confirm Deletion"
        open={open}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this Subscription?</p>
      </Modal>
    </div>
  );
};

export default Page;
