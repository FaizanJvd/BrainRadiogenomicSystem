import React from "react";
import { NavLink} from "react-router-dom";

const SideBar = () => {
  return (
    <>
      {/* <div className="container" style={{backgroundColor:'lightslategrey'}}>
          <h2>Menu</h2>
          <ul style={{listStyleType:'none'}}>
            <li><a>Register</a></li>
            <li><a>Register</a></li>
            <li><a>Register</a></li>
            <li><a>Register</a></li>
            <li><a>Register</a></li>
          </ul>
      </div> */}
      <div style={{backgroundColor: 'black',paddingRight:'20px'}}>
    <div >
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <NavLink to="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </NavLink>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <NavLink to="/" class="nav-NavLink align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/RegistrationPanel" class="nav-NavLink px-0 align-middle">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Register</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/ViewPanel" class="nav-NavLink px-0 align-middle">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">View</span></NavLink>
                    </li>
                </ul>
                <hr/>
                <div class="dropdown pb-4">
                    <a to="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" to="#">New project...</a></li>
                        <li><a class="dropdown-item" to="#">Settings</a></li>
                        <li><a class="dropdown-item" to="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" to="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
};

export default SideBar;
