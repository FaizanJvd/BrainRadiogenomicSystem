import React,{ useState, useEffect } from "react";
import pro from "../images/profile.png";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DocViewScansAndReports = () => {
    const [patients,setPatients] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getPatient();
      }, []);
      const getPatient = async () => {
        const res = await fetch("http://localhost:4000/doctor/getAssignedPatient", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (res.status === 201) {
          setPatients(data);
        }
        if (res.status === 422) {
          toast.error(data.message);
        }
      };

    const viewScans = (id) => {
        navigate("/doctorRoutes/viewScans", { state: { id: id } });
      }
      const viewReport = (id) => {
        navigate("/doctorRoutes/report", { state: { id: id } });
      }
  return (
    <div className="table-responsive px-5">
      <table className="table  table-bordered table-striped table-hover" style={{borderRadius: "1em",overflow: "hidden"}}>
        <thead style={{ backgroundColor: "rgb(88 105 173)", color: "white" }}>
          <tr>
            <th>Patient</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Scans</th>
            <th>Report</th>
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
                        src={item.picture!=null?item.picture:pro}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="ms-1">{item.name}</span>
                    </div>
                  </td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>
                    <button className="btn btn-outline-primary mx-auto" onClick={()=>viewScans(item._id)}>
                      <i class="bi bi-images"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary mx-auto" onClick={()=>viewReport(item._id)}>
                      <i class="bi bi-file-earmark-text"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        )}
      </table>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default DocViewScansAndReports
