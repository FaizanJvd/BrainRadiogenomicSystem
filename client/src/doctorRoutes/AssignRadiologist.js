import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from 'react-redux';
import pro from "../images/profile.png";
const AssignRadiologist = () => {
  const [result, setResult] = useState(null);
  const [patientData, setPatientData] = useState([]);
  const [radiologistId, setRadiologistId] = useState("");
  const {currentUser} = useSelector(state => state.user);
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
      setPatientData(data);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const res = await fetch("http://localhost:4000/doctor/getRadiologist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setResult(data);
  }
  async function assign(p_id) {
    const res =await fetch("http://localhost:4000/doctor/assignRadiologist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_id,
        doctor:currentUser,
        r_id: radiologistId,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      setRadiologistId("");
      toast.success(data.message);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  }
  return (
    <>
      <div className="table-responsive px-5">
      <table className="table  table-bordered table-striped table-hover" style={{borderRadius: "1em",overflow: "hidden"}}>
        <thead style={{ backgroundColor: "rgb(88 105 173)", color: "white" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Assign</th>
            </tr>
          </thead>
          {result === null ? (
            <tr>
              <td>No Record </td>
            </tr>
          ) : (
            result.map((result) => {
              // const { id, name, email } = user;
              return (
                <tbody>
                  <tr>
                    <td><div className="d-flex">
                      <img
                        className="rounded-circle"
                        src={result.picture!=null?result.picture:pro}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="ms-1">{result.name}</span>
                    </div></td>
                    <td>{result.email}</td>
                    <td>{result.qualification}</td>
                    <td>{result.experience}</td>
                    <td>
                      <button
                        className="btn btn-primary mx-auto"
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={() => {
                          setRadiologistId(result._id);
                        }}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })
          )}
        </table>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Assign Patient</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <table className="table table-light table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                {patientData === null ? (
                  <tr>
                    <td>No Record </td>
                  </tr>
                ) : (
                  patientData.map((patientData) => {
                    // const { id, name, email } = user;
                    return (
                      <tbody>
                        <tr>
                          <td>{patientData.name}</td>
                          <td>{patientData.email}</td>
                          <td>{patientData.age}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              type="button"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                assign(patientData._id);
                              }}
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default AssignRadiologist;
