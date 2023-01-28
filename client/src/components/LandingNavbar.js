import React from "react";
import logo from "../images/brain.png";
import { NavLink } from "react-router-dom";
import '../styles/receptionistStyles/LandingPage.css'

const LandingNavbar = () => {
  return (
        <nav
          className="navbar navbar-expand-lg NavBackground"
          style={{overflow: "hidden",position:'sticky',top:'0',zIndex:'1'}}
        >
          <div className="container-fluid " >
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="logo" style={{height:"50px",width:"50px"}}></img>
              <strong
                style={{fontSize:"30px",marginLeft:"6px",fontWeight:"500",fontFamily:"monospace",color:"white"}}
              >
                Brain Radio-Genomic System
              </strong>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto" >
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/" style={{color:"white"}}>
                    About us
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/" style={{color:"white"}}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  );
};

export default LandingNavbar;
