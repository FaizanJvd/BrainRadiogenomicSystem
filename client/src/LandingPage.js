import React from "react";
import Footer from "./components/Footer";
import ImagesCarousel from "./components/ImagesCarousel";
import LandingNavbar from "./components/LandingNavbar";
import LandingServeices from "./components/LandingServeices";
import LoginPanel from "./components/LoginPanel";
const LandingPage = () => {
  return (
    <div class='Main_Container' style={{scrollBehavior:"smooth"}}>
      <LandingNavbar/>
      <div className="d-flex justify-content-center flex-column mt-3">
        
      <h1 className="title-h2 text-center">Welcome to Brain Health Care</h1>
      <h6 className="TitleSub">Health First,we believe</h6>
      </div>
      <ImagesCarousel/>
      <LoginPanel/> 
      <LandingServeices/>
      <Footer/>
  </div> 
  );
};

export default LandingPage;