import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import pro from "../images/profile.png";
import { docAndPatId } from "../redux/radiologistReducar";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AssignedPatients = () => {
  const [patients, setPatients] =useState([]);
  const [flag,setFlag]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:4000/radiologist/getAssignedPatients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.assigned);
      });
  }, [flag]);
  const unAssignPatient = (patientId) => {
    fetch("http://localhost:4000/radiologist/deleteAssignedPatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        patientId: patientId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Patient unassigned") {
          setFlag(!flag);
          toast.success("Patient unassigned");
        } else {
          toast.error("Patient Not unassigned");
        }
      });
  };

  function generateClicked(patient,doctor){
    dispatch(docAndPatId({patientId:patient,doctorId:doctor}));
    navigate('/radiologistRoutes/uploadScans');
  }
  return (
    <div className="d-flex row justify-content-around" style={{width:"100%"}}>
      {patients === null ? (
        <h1>NO patient Assigned</h1>
      ) : (
        patients.map((item) => {
          return (
          <div
          class="card mb-2 mt-3 shadow-lg p-3 mb-5 bg-light"
            style={{ maxWidth: "460px", borderRadius: "25px" }}
          >
            <div class="row g-0 ms-2">
              <div class="col-md-4 mt-3">
                <img
                  src={item.patient.picture!=null?item.patient.picture:pro}
                  class="img-fluid"
                  alt="..."
                  style={{ borderRadius: "50%" }}
                />
                <p class="card-text mt-1">
                    <small class="text-muted">Assigned By: Dr.{item.doctor.name}</small>
                  </p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{item.patient.name}</h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-4 fw-bold">
                      <label className="card-text">Email</label>
                      <br />
                      <label className="card-text">Age</label>
                      <br />
                      <label className="card-text">Gender</label>
                    </div>
                    <div className="col-md-3">
                      <label className="card-text">{item.patient.email}</label>
                      <br />
                      <label className="card-text">{item.patient.age}</label>
                      <br />
                      <label className="card-text">{item.patient.gender}</label>
                    </div>
                  </div>
                  <div className="d-flex p-2">
                    <button className="btn btn-primary mt-2"  style={{backgroundColor:"rgb(48 66 137)",color:"white",borderRadius:"20px"}} onClick={()=>{generateClicked(item.patient._id,item.doctor._id)}}>Generate Report</button>
                    <button className="btn btn-danger rounded-circle mt-2 ms-2" onClick={()=>unAssignPatient(item.patient._id)} ><i class="bi bi-person-x-fill"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
           );})
      )} 
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
  );
};

export default AssignedPatients;
