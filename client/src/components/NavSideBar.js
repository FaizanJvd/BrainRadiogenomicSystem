import React from "react";
import logo from "../images/brain.png";
import { NavLink } from "react-router-dom";
const NavSideBar = (props) => {
  return (
    <>
    {/* Off-Canvas Start........ */}
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
        style={{ backgroundColor: "currentcolor", transition: "0.5s" }}
      >
        <div class="offcanvas-header" style={{ backgroundColor: "royalBlue" }}>
          <h5
            class="offcanvas-title"
            id="offcanvasLabel"
            style={{ color: "white" }}
          >
            MENU
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body" style={{ color: "white" }}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-group">
                <li className="nav-item" >
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                   <i className="fs-4 bi bi-house " style={{color:"white"}}></i> <span class="ms-1 d-none d-sm-inline fs-4" style={{color:"white"}}>Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/RegistrationPanel">
                  <i className="fs-4 bi bi-card-checklist" style={{color:"white"}}></i> <span class="ms-1 d-none d-sm-inline fs-4" style={{color:"white"}}>RegistrationPanel</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ViewPanel">
                  <i className="fs-4 bi bi-card-list" style={{color:"white"}}></i> <span class="ms-1 d-none d-sm-inline fs-4" style={{color:"white"}}>ViewPanel</span>
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item ">
                  <NavLink className="nav-link" to={"/login"}>
                  <i className="fs-4 bi bi-house" style={{color:"white"}}></i> <span class="ms-1 d-none d-sm-inline fs-4" style={{color:"white"}}>{props.log}</span>
                  </NavLink>
                </li>
              </ul>
        </div>
      </div>
    {/* .... OFF-Canvas End */}

    {/* NAvBar Start..... */}
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            aria-controls="offcanvas"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div>
          <img src={logo} alt="logo" className="rounded-circle" height={45}></img>
          <span className = "fs-4" style={{
                  marginLeft:"5px",
                  fontFamily: "Times",
                  fontSize: "12",
                  color:"white",
                  fontWeight:"bold"
                }}>
              Brain Radio-Genomic System
          </span>
          </div>
          {/* Dropdown Start... */}
          <div class="dropdown dropstart">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              class="rounded-circle dropdown-toggle"
              height="28"
              alt="Black and White Portrait of a Man"
              loading="lazy"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
            ></img>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li>
                <button class="dropdown-item" type="button">
                  Action
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  Another action
                </button>
              </li>
              <li>
                <NavLink className="nav-link" to="/login">
                  <button class="dropdown-item" type="button">
                    Logout
                  </button>
                </NavLink>
                
              </li>
            </ul>
          </div>
          {/* Dropdown End... */}
        </div>
      </nav>
      {/* .....NavBar End */}
    </>
  );
};

export default NavSideBar;
