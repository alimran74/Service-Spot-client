import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer position="top-center"></ToastContainer>
      <div className="min-h-[calc(100vh-116px)]">
        <Outlet />
      </div>
      <Footer />
      
    </div>
  );
};

export default AuthLayout;
