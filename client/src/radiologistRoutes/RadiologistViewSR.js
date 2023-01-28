import React, { useState, useEffect } from "react";
import pro from "../images/profile.png";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
const RadiologistViewSR = () => {
  const [patients, setPatients] = useState([]);
  const {currentUser} = useSelector(state => state.radiologist);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/report/radiologistReports/"+currentUser, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      } 
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      });
  }, []);
  const viewScans = (id) => {
    navigate("/radiologistRoutes/viewScans", { state: { id: id } });
  }
  const viewReport = (id) => {
    navigate("/radiologistRoutes/report", { state: { id: id } });
  }
  return (
    <div className="px-5">
      <table className="table  table-bordered table-striped table-hover" style={{borderRadius: "1em",overflow: "hidden"}}>
        <thead style={{backgroundColor:"rgb(88 105 173)",color:"white"}}>
          <tr >
            <th>Patient</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Scans</th>
            <th >Report</th>
          </tr>
        </thead>
        {patients === null ? (
          <h1>NO patient Assigned</h1>
        ) : (
          patients.map((item) => {
            return (
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex">
                      <img
                        className="rounded-circle"
                        src={item.patient.picture!=null?item.patient.picture:pro}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="ms-1">{item.patient.name}</span>
                    </div>
                  </td>
                  <td>{item.patient.age}</td>
                  <td>{item.patient.gender}</td>
                  <td>
                    <button className="btn btn-info mx-auto" style={{borderRadius:"20px",backgroundColor:"rgb(48 66 137)",color:"#DADFF7"}} onClick={()=>viewScans(item.patient._id)}>
                      <i class="bi bi-images"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-info mx-auto" style={{borderRadius:"20px",backgroundColor:"rgb(48 66 137)",color:"#DADFF7"}} onClick={()=>viewReport(item.patient._id)}>
                      <i class="bi bi-file-earmark-text"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        )}
      </table>
    </div>
  );
};

export default RadiologistViewSR;
