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
  import {useSelector} from 'react-redux'
const PatientSidebar = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <CDBSidebar textColor="#fff" backgroundColor="linear-gradient(to top, #90caf9, #1976d2)">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        MenuBar
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <NavLink to="/patientRoutes/">
            <CDBSidebarMenuItem icon="th-large">Profile</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/patientRoutes/doctor">
            <CDBSidebarMenuItem icon="sticky-note">
              Doctor
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/patientRoutes/report" state={{id:currentUser}}>
            <CDBSidebarMenuItem icon="sticky-note">
              Report
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/patientRoutes/viewScans" state={{id:currentUser}}>
            <CDBSidebarMenuItem icon="sticky-note">
              Scans
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/patientRoutes/history">
            <CDBSidebarMenuItem icon="sticky-note">
              History
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/patientLogout">
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

export default PatientSidebar
