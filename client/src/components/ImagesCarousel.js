import React from "react";
import c1 from "../images/landback.jpg";
const ImagesCarousel = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          textAlign: "center",
          color: "white",
        }}
      >
        <img
          src={c1}
          alt="."
          style={{ width: "90%", height: "500px", margin: "auto",borderTopRightRadius:"50%",borderBottomLeftRadius:"50%" }}
        />
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "70px",
            fontFamily:"High Tower Text",
            color:"whitesmoke",
            width:"100%",
          }}
        >
          Brain RadioGenomic System
          <label style={{fontSize:"45px",display:"block"}}>Health First, We Believe</label>
        </h1>
      </div>
      {/* <div className="d-flex ustify-content-between">
        <img
          src = {c1}
          alt="."
          style={{ width: "100%", height: "500px", margin: "auto", }}
          ></img>
          {/* <label style={{fontSize:"45px",display:"block"}}>Health First, We Believe</label> */}
      {/* </div> */} 
    </>
  );
};

export default ImagesCarousel;
