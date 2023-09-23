import Dashboard from "@/components/Dashboard/Dashboard";
import React from "react";
//import Main from "./page";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Dashboard>{children}</Dashboard>
    </>
  );
};

export default DashboardLayout;
