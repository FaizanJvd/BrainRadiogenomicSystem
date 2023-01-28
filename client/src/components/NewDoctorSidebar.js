import React from "react";
import "../layout.css";
import { Link } from "react-router-dom";
import logo from "../images/brain.png";

const NewDoctorSidebar = (props) => {
  return (
    <div class={`sidebar ${props.t ? "open" : ""}`}>
      <nav class=" sideNav navbar navbar-dark" style={{backgroundColor:"#52799b"}}>
        <Link to="/doctorRoutes/" class="navbar-brand mx-4">
          <img src={logo} alt="logo"></img>
          <label
            style={{
              fontSize: "30px",
              position: "absolute",
              marginTop: "25px",
              fontWeight: "500",
              fontFamily: "Times New Roman",
            }}
          >
            BRs
          </label>
        </Link>
        <div class="navbar-nav w-100 mt-2">
          <Link to="/doctorRoutes/" class="nav-item nav-link">
            <i class="bi bi-person-circle me-2"></i>Profile
          </Link>
          <Link to="/doctorRoutes/patient" class="nav-item nav-link">
            <i class="bi bi-person-lines-fill me-2"></i>Patients
          </Link>
          <Link to="/doctorRoutes/assignRadiologist" class="nav-item nav-link">
            <i class="bi bi-person-plus-fill me-2"></i>Radiologists
          </Link>
          <Link to="/doctorRoutes/viewScansAndReports" class="nav-item nav-link">
            <i class="bi bi-clipboard2-pulse-fill me-2"></i> SX/Scans
          </Link>
          <Link to="/doctorRoutes/rxAndRec" class="nav-item nav-link">
            <i class="bi bi-file-earmark-text-fill me-2"></i>RX/REC
          </Link>
          <Link
            to="/doctorLogout"
            class="nav-item nav-link active"
            style={{ position: "fixed", marginTop: "30em" }}
          >
            <i class="bi bi-box-arrow-right me-2"></i>Logout
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NewDoctorSidebar;
