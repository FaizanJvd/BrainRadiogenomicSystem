import React from 'react'
import '../layout.css'
import {Link} from 'react-router-dom'
import logo from '../images/brain.png'
const NewReceptionistSidebar = (props) => {
  return (
    <div class={`sidebar ${props.t?"open":""}`}>
            <nav class=" sideNav navbar navbar-dark" style={{backgroundColor:"#52799b"}}>
                <Link to="/receptionistRoutes/" class="navbar-brand mx-4">
                    <img src={logo} alt="logo"></img>
                    <label style={{fontSize:"30px",position:"absolute",marginTop:"25px",fontWeight:"500",fontFamily:"Times New Roman"}}>BRs</label>
                </Link>
                <div class="navbar-nav w-100 mt-2">
                    <Link to="/receptionistRoutes/" class="nav-item nav-link"><i class="bi bi-person-circle me-2"></i>Profile</Link>
                    {/* <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class="fas fa-user-plus me-2"></i>Register</a>
                        <div class="dropdown-menu bg-transparent border-0">
                            <Link to="/admin/RegisterDoctor" class="dropdown-item">Doctor</Link>
                            <Link to="/admin/RegisterRadiologist" class="dropdown-item">Radiologist</Link>
                            <Link to="/admin/RegisterReceptionist" class="dropdown-item">Receptionist</Link>
                        </div>
                    </div>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class="fas fa-users me-2"></i>View</a>
                        <div class="dropdown-menu bg-transparent border-0">
                            <Link to="/admin/ViewDoctor" class="dropdown-item">Doctor</Link>
                            <Link to="/admin/ViewPatient" class="dropdown-item">Patient</Link>
                            <Link to="/admin/ViewRadiologist" class="dropdown-item">Radiologist</Link>
                            <Link to="/admin/ViewReceptionist" class="dropdown-item">Receptionist</Link>
                        </div>
                    </div> */}
                    <Link to="/receptionistRoutes/registerPatient" class="nav-item nav-link"><i class="bi bi-person-plus me-2"></i>Register Patient</Link>
                    <Link to="/receptionistLogout" class="nav-item nav-link active" style={{position:"fixed",marginTop:"30em"}}><i class="bi bi-box-arrow-right me-2"></i>Logout</Link>
                    
                </div>
            </nav>
        </div>
  )
}

export default NewReceptionistSidebar
