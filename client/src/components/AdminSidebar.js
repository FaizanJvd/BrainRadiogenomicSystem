import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <CDBSidebar textColor="#fff" backgroundColor="linear-gradient(to top, #90caf9, #1976d2)" >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        MenuBar
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <NavLink to="/admin/">
            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          </NavLink>
          <hr/>
          <h4>Register</h4>
          <hr/>
          <NavLink to="/admin/RegisterDoctor">
            <CDBSidebarMenuItem icon="sticky-note">
              Doctor
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/admin/RegisterReceptionist">
            <CDBSidebarMenuItem icon="sticky-note">
              Receptionist
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/admin/RegisterRadiologist">
            <CDBSidebarMenuItem icon="sticky-note">
              Radiologist
            </CDBSidebarMenuItem>
          </NavLink>
          <hr/>
          <h4>View</h4>
          <hr/>
          <NavLink to="/admin/ViewDoctor">
            <CDBSidebarMenuItem icon="sticky-note">
              Doctor
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/admin/ViewPatient">
            <CDBSidebarMenuItem icon="sticky-note">
              Patient
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/admin/ViewReceptionist">
            <CDBSidebarMenuItem icon="sticky-note">
              Receptionist
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/admin/ViewRadiologist">
            <CDBSidebarMenuItem icon="sticky-note">
              Radiologist
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/admin/ViewPatientsReported">
            <CDBSidebarMenuItem icon="sticky-note" iconType="solid">
              Reports
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/">
            <CDBSidebarMenuItem icon="sticky-note" iconType="solid">
              Logout
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper fs-3"
          style={{ padding: "20px 5px" }}
        >
          BrainRadioGenomic System
        </div>
      </CDBSidebarFooter> */}
    </CDBSidebar>
  );
};

export default AdminSidebar;
