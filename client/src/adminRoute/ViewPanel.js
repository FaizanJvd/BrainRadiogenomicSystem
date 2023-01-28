import React from "react";
import docPic from "../images/docView.png";
import radioPic from "../images/radioView.png";
import recepPic from "../images/recepView.png";
import labPic from "../images/labTechView.png";
import { Link } from "react-router-dom";
import "../../src/MyStyles.css";
import Button from "@mui/material/Button";
const ViewPanel = () => {
  return (
    <>
    
    <div
      className="d-flex justify-content-evenly flex-wrap"
      style={{ marginTop: "40px" }}
    >
      <Link to="/admin/ViewDoctor">
        <div>
          <Button size="large">
            <img src={docPic} alt="ViewDoctor" />
          </Button>
          <br></br>
          <strong>View Doctor</strong>
        </div>
      </Link>

      <Link to="/admin/ViewRadiologist">
        <div>
          <Button size="large">
            <img src={radioPic} alt="ViewRadiologist" />
          </Button>
          <br></br>
          <strong>View Radiologist</strong>
        </div>
      </Link>
    </div>
    <div className="d-flex justify-content-evenly flex-wrap"
      style={{ marginTop: "60px" }}>
      <Link to='/admin/ViewReceptionist' >
        <div>
            <Button size="large">
              <img src={recepPic} alt="ViewReceptionist"/>
            </Button> 
          <br></br>
          <strong>View Receptionist</strong>
        </div>
        </Link>

        <Link to='/admin/ViewLabTechnician' >
        <div>
            <Button size="large">
              <img src={labPic} alt="ViewLabTechnician"/>
            </Button> 
          <br></br>
          <strong>View LabTechnician</strong>
        </div>
        </Link>
    </div>
    </>
  );
};

export default ViewPanel;
