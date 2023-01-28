import React from "react";
import "../../src/MyStyles.css";
import Button from "@mui/material/Button";
import docPic from "../images/doctor.png";
import radioPic from "../images/radiol.png";
import recpPic from "../images/recep.png";
import labPic from "../images/labtec.png";
// import doct from "../images/doctor.png";
import { Link } from "react-router-dom";
const RegistrationPanel = () => {
  return (
    <>
      <div
        className=" d-flex justify-content-evenly"
        style={{ marginTop: "40px", height: '44vh'}}
      >
        <Link to="/admin/RegisterDoctor">
          <div>
            <Button size="large">
              <img src={docPic} alt="RegisterDoctor" />
            </Button>
            <br></br>
            <strong>Register Doctor</strong>
          </div>
        </Link>

        <Link to="/admin/RegisterRadiologist">
          <div>
            <Button size="large">
              <img src={radioPic} alt="RegisterRadiologist" />
            </Button>
            <br></br>
            <strong>Register Radiologist</strong>
          </div>
        </Link>
      </div>
      <div
        className="d-flex justify-content-evenly"
        style={{ marginTop: "60px" }}
      >
        <Link to="/admin/RegisterReceptionist">
          <div>
            <Button size="large">
              <img src={recpPic} alt="RegisterReceptionist" />
            </Button>
            <br></br>
            <strong>Register Receptionist</strong>
          </div>
        </Link>
        <Link to="/admin/RegisterLabTechnician">
          <div>
            <Button size="large">
              <img src={labPic} alt="RegisterLabTechnician" />
            </Button>
            <br></br>
            <strong>Register LabTechnician</strong>
          </div>
        </Link>
      </div>
    </>
  );
};

export default RegistrationPanel;
