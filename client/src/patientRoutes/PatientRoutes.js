import React, {useState,useEffect } from "react";
import "../layout.css";
import pro from "../images/profile.png";
import { Outlet } from 'react-router-dom'
import PatientSidebar from '../components/NewPatientSidebar'
const PatientRoutes = () => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    fetch("http://localhost:4000/patient/getInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      }
      );
  }, []);
  const toogle = () => {
    setOpen(!open);
  };
  return (
    <>
        <PatientSidebar t={open}/>
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
                src={userInfo.picture!=null?userInfo.picture:pro}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div class="ms-2">
              <h4 className="text-light">{userInfo.name}</h4>
              <label className="ms-2 text-white fst-italic">Patient</label>
              
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  )
}
export default PatientRoutes
