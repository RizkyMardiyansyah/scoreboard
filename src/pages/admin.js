"use client";
import { Fragment } from "react";
import Navbar from "../components/Navbar";
import React from "react";
import "react-tabs/style/react-tabs.css";
import Sidebar from "../components/Sidebar Content/Sidebar2";

const Admin = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="bg-slate-300">
        <Sidebar />
      </div>
    </Fragment>
  );
};
export default Admin;
