"use client";
import { Fragment } from "react";
import Navbar from "../components/Navbar";
import React from "react";
import Sidebar from "../components/Sidebar Content/Sidebar2";

const Admin = () => {
  return (
    <Fragment>
      {/* <Navbar /> */}
      <div className="bg-[#ffffff]">
        <Sidebar />
      </div>
    </Fragment>
  );
};
export default Admin;
