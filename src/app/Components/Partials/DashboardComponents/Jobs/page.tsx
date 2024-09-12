"use client";
import React from "react";
import Dashboard from "../../../../Dashboard/Dashboard";
import CreateJob from "../../DashboardPartials/CreateJob/page";

const Page = () => {
  return (
    <Dashboard>
      <div>
        <CreateJob />
      </div>
    </Dashboard>
  );
};

export default Page;
