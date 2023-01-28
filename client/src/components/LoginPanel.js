import React from "react";
import "./LoginPanel.css";
import { Link } from "react-router-dom";
import adminImg from "../images/admin.jpeg";
import doctorImg from "../images/doctor.jpeg";
import receptionistImg from "../images/receptionist.jpeg";
import radiologistImg from "../images/radiologist.jpeg";
import patientImg from "../images/patient.jpeg";
const LoginPanel = () => {
  return (
    <>
      <div class="Ssection-title mt-3">
        <h2>Portels</h2>
        <h3>
          Access your <label style={{fontSize:"30px",color: '#106eea',display:"block"}}>Portal</label>
        </h3>
        <p>Login to your account to get modern experiecne of Health system</p>
      </div>
      <div class="row mt-1  Mian_Container w-100">
        <div class="col-md-2">
          <Link to="/adminLogin">
            <div class="profile-card-2">
              <img src={adminImg} alt=".." />
              <div class="profile-name">Admin</div>
              <div class="profile-username">Login</div>
            </div>
          </Link>
        </div>
        <div class="col-md-2">
          <Link to="/patientLogin">
            <div class="profile-card-2">
              <img src={patientImg} alt=".." />
              <div class="profile-name">Patient</div>
              <div class="profile-username">Login</div>
            </div>
          </Link>
        </div>
        <div class="col-md-2">
          <Link to="/doctorLogin">
            <div class="profile-card-2">
              <img src={doctorImg} alt=".." />
              <div class="profile-name">Doctor</div>
              <div class="profile-username">Login</div>
            </div>
          </Link>
        </div>
        <div class="col-md-2">
          <Link to="/receptionistLogin">
            <div class="profile-card-2">
              <img src={receptionistImg} alt=".." />
              <div class="profile-name">Receptionist</div>
              <div class="profile-username">Login</div>
            </div>
          </Link>
        </div>
        <div class="col-md-2">
          <Link to="/radiologistLogin">
            <div class="profile-card-2">
              <img src={radiologistImg} alt=".." />
              <div class="profile-name">Radiologist</div>
              <div class="profile-username">Login</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPanel;
