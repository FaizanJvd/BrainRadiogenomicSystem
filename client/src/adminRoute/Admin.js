import { Outlet } from "react-router-dom";
import React, {useState } from "react";
import "../layout.css";
import pro from "../images/adminProfile.jpeg";
import AdminSidebar from "../components/NewAdminSidebar";
// import "../../src/MyStyles.css";
const Admin = () => {
  const [open, setOpen] = useState(false);
  const toogle = () => {
    setOpen(!open);
  };
  return (
    <>
      <AdminSidebar t={open} />
      <div className={`content ${open ? "open" : ""}`}>
        <nav class="navbar navbar-expand navbar-dark sticky-top px-4 py-0" style={{backgroundColor:"#52799b"}}>
          <button class="sidebar-toggler flex-shrink-0 btn btn-primary" onClick={toogle}>
            <i class={open?'bi bi-three-dots-vertical':'bi bi-list'} style={{fontSize:"26px",fontWeight:"bold"}}></i>
          </button>
            <label style={{fontSize:"32px",marginLeft:"6px",fontWeight:"500",fontFamily:"monospace",color:"white"}}>Brain RadioGenomic System</label>
          <div class="navbar-nav align-items-center ms-auto ">
            <div class="position-relative">
              <img
                class="rounded-circle"
                src={pro}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div class="ms-2">
              <h4 className="text-light">Faizan</h4>
              <label className="ms-2 text-white fst-italic">Admin</label>
              
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
