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
const RadiologistSidebar = () => {
  return (
    <div className='vh-100'>
      <CDBSidebar textColor="#fff" backgroundColor="#2C365E">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        MenuBar
      </CDBSidebarHeader>
      <CDBSidebarContent  >
        <CDBSidebarMenu textColor="#fff">
          <NavLink to="/radiologistRoutes/">
            <CDBSidebarMenuItem icon="th-large">Profile</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/radiologistRoutes/patients">
            <CDBSidebarMenuItem icon="sticky-note">
              Patients
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/radiologistRoutes/scansAndreport">
            <CDBSidebarMenuItem icon="sticky-note">
              Scans&Reports
            </CDBSidebarMenuItem>
          </NavLink>
          
          <NavLink to="/radiologistLogout">
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
    </div>
  )
}

export default RadiologistSidebar
