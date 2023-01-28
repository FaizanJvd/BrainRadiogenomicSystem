import React from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from "cdbreact";
  import { NavLink } from "react-router-dom";
const DoctorSidebar = () => {
  return (
    <CDBSidebar textColor="#fff" backgroundColor="linear-gradient(to top, #90caf9, #1976d2)">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        MenuBar
      </CDBSidebarHeader>
      <CDBSidebarContent  >
        <CDBSidebarMenu textColor="#fff">
          <NavLink to="/doctorRoutes/">
            <CDBSidebarMenuItem icon="th-large">Profile</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/doctorRoutes/patient">
            <CDBSidebarMenuItem icon="sticky-note">
              Patients
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/doctorRoutes/assignRadiologist">
            <CDBSidebarMenuItem icon="sticky-note">
              Radiologists
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/doctorRoutes/viewScansAndReports">
            <CDBSidebarMenuItem icon="sticky-note">
              Reports & Scans
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/doctorRoutes/rxAndRec">
            <CDBSidebarMenuItem icon="sticky-note">
              {'RX & REC'}
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/doctorLogout">
            <CDBSidebarMenuItem icon="sticky-note" iconType="solid">
              Logout
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        {/* <div
          className="sidebar-btn-wrapper fs-3"
          style={{ padding: "20px 5px" }}
        >
          BrainRadioGenomic System
        </div> */}
      </CDBSidebarFooter>
    </CDBSidebar>
  )
}

export default DoctorSidebar
