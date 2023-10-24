import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const FrontLayout = () => {
  return (
    <>
      <Header />
      <div className="sps"></div>
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontLayout;
