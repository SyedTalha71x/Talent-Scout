// src/app/components/Partials/Sidebar.tsx
"use client";
import React, { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { HomeOutlined, UserOutlined, BarChartOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div className="flex">
      {/* Button to open Drawer */}
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        className="md:hidden text-white bg-blue-500 hover:bg-blue-600"
      />

      {/* Drawer Component for small and medium screens */}
      <Drawer
        title="Dashboard"
        placement="left"
        closable={true} // Close button is enabled
        onClose={onClose}
        open={open}
        className="bg-gray-800 text-white"
        width={215} // Adjust width as needed
        closeIcon={<Button className="text-black text-xl" onClick={onClose}>✕</Button>} // Custom close icon
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="h-full border-none"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/Components/Partials/DashboardComponents/MainHero">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link href="/Components/Partials/DashboardComponents/User">User</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            <Link href="#">Analytics</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            <Link href="#">Jobs</Link> {/* Added Jobs */}
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Sidebar for large screens */}
      <div className="hidden md:block w-64 bg-gray-800 text-white">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="h-full border-none bg-gray-800 text-white"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/Components/Partials/DashboardComponents/MainHero">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link href="/Components/Partials/DashboardComponents/User">User</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            <Link href="#">Analytics</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            <Link href="#">Jobs</Link> {/* Added Jobs */}
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
