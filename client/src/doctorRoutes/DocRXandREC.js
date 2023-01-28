import React, { useState, useEffect } from "react";
import pro from "../images/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DocRXandREC = () => {
  const [patientData, setPatientData] = useState([]);
  const [prescription, setPrescription] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    getPatient();
  }, [flag]);
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
  const uploadPrescription = async (p_id) => {
    if (prescription != "" && recommendation != "") {
      const res = await toast.promise( fetch("http://localhost:4000/doctor/addRxRec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prescription: prescription,
          recommendation: recommendation,
          patient: p_id,
        }),
        credentials: "include",
      }),
      {
        pending: "Uploading...",
        success: "Uploaded",
        error: "Error",
      }
      );
      const data = await res.json();
      if (res.status === 201) {
        setPrescription("");
        setRecommendation("");
      }
      if (res.status === 422) {
        toast.error(data.message);
        
      }
    }
    else{
      toast.warning("Please fill both the fields");
    }
  };
  const unAssignPatient = async (p_id) => {
    const res = await fetch("http://localhost:4000/doctor/unAssignPatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_id,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 201) {
      toast.success(data.message);
      setFlag(!flag);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };
  return (
    <div className="px-5">
      <table className="table  table-bordered table-striped table-hover" style={{borderRadius: "1em",overflow: "hidden"}}>
        <thead style={{backgroundColor:"rgb(88 105 173)",color:"white"}}>
          <tr>
            <th>Name</th>
            <th>Prescription</th>
            <th>Recommendation</th>
            <th>Submit</th>
            <th>CheckOut</th>
          </tr>
        </thead>
        {patientData.map((item) => {
          return (
            <tbody>
              <tr>
                <td><div className="d-flex">
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
                    </div></td>
                <td>
                  <textarea
                    row="4"
                    col="50"
                    placeholder="Enter Prescription"
                    style={{ width: "15em" }}
                    onChange={(e) => setPrescription(e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    row="4"
                    col="50"
                    type="text"
                    placeholder="Enter Recommendation"
                    onChange={(e) => setRecommendation(e.target.value)}
                    style={{ width: "15em" }}
                    />
                </td>
                <td>
                  <button
                    className="btn btn-success mx-auto"
                    onClick={() => {
                      uploadPrescription(item._id);
                    }}
                    >
                    <i class="bi bi-plus-circle"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger mx-auto"
                    onClick={() => {
                      unAssignPatient(item._id);
                    }}
                    >
                    <i class="bi bi-x-square"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
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
  );
};

export default DocRXandREC;
