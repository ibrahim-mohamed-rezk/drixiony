import React from "react";
import Header from "../components/Home2/Header";
import Footer1 from "../components/Footer/Footer1";
import Breadcrumb from "./Breadcrumb";
import Modals from "../components/Home1/Modals";

function MainLayout({ children }) {
  return (
    <>
      <Modals />
      <Header />
      {/* <Breadcrumb /> */}
      <div className="pt-100">{children}</div>
      <Footer1 />
    </>
  );
}

export default MainLayout;
