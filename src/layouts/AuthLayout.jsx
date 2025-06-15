import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import { ToastContainer } from "react-toastify";
import ClickSpark from "../components/shared/ClickSpark";
import FadeContent from "../components/shared/FadeContent";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer position="top-center"></ToastContainer>
      <div className="min-h-[calc(100vh-116px)]">
        <ClickSpark>
          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <Outlet />
          </FadeContent>
        </ClickSpark>
      </div>
      <Footer />
      
    </div>
  );
};

export default AuthLayout;
