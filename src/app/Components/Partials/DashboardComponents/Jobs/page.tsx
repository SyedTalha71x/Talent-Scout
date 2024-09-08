"use client";
import React from 'react';
import Layout from '../../../../Dashboard/Layout/page';
import CreateJob from '../../DashboardPartials/CreateJob/page'

const Page = () => {

  return (
    <Layout>
     <div>
        <CreateJob/>
     </div>
    </Layout>
  );
};

export default Page;
