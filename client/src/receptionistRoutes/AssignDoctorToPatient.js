import React, { useEffect, useState } from "react";
import "../styles/receptionistStyles/Assign.css";
import { useSelector,useDispatch } from "react-redux";
import pro from "../images/profile.png";
import {patientId} from '../redux/recpReducer';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignDoctorToPatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  const p_id = useSelector((state) => state.recp.currentPatient);

  useEffect(() => {
    getData();
  }, []);

  async function createChat (d_id) {
    console.log("Doctor id is: ",d_id);
    const res = await fetch('http://localhost:4000/chat/newChat',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        senderId:p_id,
        receiverId:d_id
      })
    });
    const data = await res.json();
    if (res.status === 201) {
      toast.success(data.message)
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  }

  async function getData() {
    const res = await fetch("http://localhost:4000/getDoctor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setResult(data);
  }
  async function assignDoctor(d_id) {
    const res = await fetch(
      "http://localhost:4000/receptionist/assign/doctor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          d_id,
          p_id: p_id,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 201) {
      toast.success(data.message);
      createChat(d_id);
      dispatch(patientId({currentPatient:null}))
      navigate("/receptionistRoutes/registerPatient");
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  }
  const filterData = async (value) => {
    if (value === null || value === "all" || value === "Choose...") {
      getData();
    } else {
      const res = await fetch("http://localhost:4000/filter/filterDoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          speciality: value,
        }),
      });
      const data = await res.json();
      setResult(data);
    }
  };
  return (
    <>
    <div className=" px-5">
        <div className="mt-2 mb-1 mx-2 input-group d-flex justify-content-end">
          <select
            class="custom-select"
            id="inputGroupSelect04"
            style={{ width: "400px",height:"35px" }}
            onChange={(e) => filterData(e.target.value)}
          >
            <option selected>Choose...</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Cancer Specialist , Oncologist">
              Cancer Specialist,Oncologist
            </option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <div className="px-5" >

      <table className="table  table-bordered table-striped table-hover" style={{borderRadius: "1em",overflow: "hidden"}}>
        <thead style={{ backgroundColor: "rgb(88 105 173)", color: "white" }}>
            <tr >
              <th >Name</th>
              <th >Qualification</th>
              <th >Specialization</th>
              <th >Assign</th>
            </tr>
          </thead>
          {result === null ? (
            <tr>
              <td>No Record </td>
            </tr>
          ) : (
            result.map((result) => {
              return (
                <tbody >
                  <tr >
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
                      <span className="ms-1">{`Dr.${result.name}`}</span>
                    </div></td>
                    <td>{result.qualification}</td>
                    <td>{result.specialization}</td>
                    <td>
                      <button
                        className="btn btn-primary mx-auto"
                        onClick={() => assignDoctor(result._id)}
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

export default AssignDoctorToPatient;
