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
const RecepSidebar = () => {
  return (
    <>
      <CDBSidebar textColor="#fff" backgroundColor="linear-gradient(to top, #90caf9, #1976d2)">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        MenuBar
      </CDBSidebarHeader>
      <CDBSidebarContent  >
        <CDBSidebarMenu textColor="#fff">
          <NavLink to="/receptionistRoutes/">
            <CDBSidebarMenuItem icon="th-large">Profile</CDBSidebarMenuItem>
          </NavLink>
            <NavLink to="/receptionistRoutes/registerPatient">
                <CDBSidebarMenuItem icon="sticky-note">
                    Reigister Patient
                </CDBSidebarMenuItem>
          </NavLink>
          <div style={{marginTop:'28em'}}>
          <NavLink to="/receptionistLogout">
            <CDBSidebarMenuItem icon="sticky-note" iconType="solid" textAlign='buttom'>
              Logout
            </CDBSidebarMenuItem>
          </NavLink>
          </div>
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
    </>
  )
}

export default RecepSidebar
