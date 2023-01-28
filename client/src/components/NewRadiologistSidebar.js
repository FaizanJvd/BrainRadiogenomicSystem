import React from "react";
import "../layout.css";
import { Link } from "react-router-dom";
import logo from "../images/brain.png";
const NewRadiologistSidebar = (props) => {
  return (
    <div class={`sidebar ${props.t ? "open" : ""}`}>
      <nav class=" sideNav navbar navbar-dark" style={{backgroundColor:"#52799b"}}>
        <Link to="/radiologistRoutes/" class="navbar-brand mx-4">
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
          <Link to="/radiologistRoutes/" class="nav-item nav-link">
            <i class="bi bi-person-circle me-2"></i>Profile
          </Link>
          <Link to="/radiologistRoutes/patients" class="nav-item nav-link">
            <i class="bi bi-person-lines-fill me-2"></i>Patients
          </Link>
          <Link
            to="/radiologistRoutes/scansAndreport"
            class="nav-item nav-link"
          >
            <i class="bi bi-file-richtext me-2"></i>SX/Scans
          </Link>
          <Link
            to="/radiologistLogout"
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

export default NewRadiologistSidebar;
