// components/Layout.tsx
"use client";
import React, { ReactNode } from 'react';
import Sidebar from '../../Components/Partials/Sidebar/page';
import Navbar from '../../Components/Partials/semiNavbar/page';
import { Layout as AntLayout } from 'antd';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

const Page: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider>
        <Sidebar />
      </Sider>
      <AntLayout>
        <Header className="">
          <Navbar />
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Page;
