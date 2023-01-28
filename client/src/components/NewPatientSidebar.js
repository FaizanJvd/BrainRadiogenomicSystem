import React from "react";
import "../layout.css";
import { Link } from "react-router-dom";
import logo from "../images/brain.png";
import {useSelector} from 'react-redux'
const NewPatientSidebar = (props) => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div class={`sidebar ${props.t ? "open" : ""}`}>
      <nav class=" sideNav navbar navbar-dark" style={{backgroundColor:"#52799b"}}>
        <Link to="/patientRoutes/" class="navbar-brand mx-4">
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
          <Link to="/patientRoutes/" class="nav-item nav-link">
            <i class="bi bi-person-circle me-2"></i>Profile
          </Link>
          <Link to="/patientRoutes/doctor" class="nav-item nav-link">
            <i class="bi bi-person-plus-fill me-2"></i>Doctors
          </Link>
          <Link to="/patientRoutes/report" state={{id:currentUser}} class="nav-item nav-link">
            <i class="bi bi-clipboard2-pulse me-2"></i>Report
          </Link>
          <Link to="/patientRoutes/viewScans" state={{id:currentUser}} class="nav-item nav-link">
            <i class="bi bi-images me-2"></i>Scans
          </Link>
          <Link to="/patientRoutes/history" class="nav-item nav-link">
            <i class="bi bi-file-medical me-2"></i>History
          </Link>
          <Link
            to="/patientLogout"
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

export default NewPatientSidebar;
