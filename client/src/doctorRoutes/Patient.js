import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { chatCreated } from "../redux/userRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pro from "../images/profile.png";
const Patient = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [patientData, setPatientData] = useState([]);
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
  async function findChat(p_id) {
    const res = await fetch("http://localhost:4000/chat/findChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstId: currentUser,
        secondId: p_id,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      dispatch(chatCreated({ recieverId: p_id, chatId: data._id }));
      Navigate("/doctorRoutes/chat");
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  }
  function call(p_id) {
    dispatch(chatCreated({ recieverId: p_id }));
    Navigate("/doctorRoutes/videoCall");
  }
  return (
    <div className="mx-auto mt-2 row justify-content-between" style={{width:"95%"}}>
      {patientData.map((item) => {
        return (
          <div
            // backgroundImage: "linear-gradient(to right, #f5f7fa, #c3cfe2)"
            className="card mb-3 mt-2 shadow-lg p-3 mb-5 bg-light"
            style={{ "max-width": "540px", borderRadius: "25px" }}
            key={item._id}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={item.picture!=null?item.picture:pro}
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ fontSize: 22, fontWeight: "bold" }}
                  >
                    {item.name}
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-4 fw-bold">
                      <label className="card-text">Email :</label>
                      <br />
                      <label className="card-text">Age :</label>
                      <br />
                      <label className="card-text">Gender :</label>
                    </div>
                    <div className="col-md-3">
                      <label className="card-text">{item.email}</label>
                      <br />
                      <label className="card-text">{item.age}</label>
                      <br />
                      <label className="card-text">{item.gender}</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-1">
                    <button
                      className="btn btn-primary rounded-circle "
                      onClick={() => {
                        findChat(item._id);
                      }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Chat"
                    >
                      <i class="bi bi-chat-quote mx-1"></i>
                    </button>
                    <button
                      className="btn btn-primary rounded-circle ms-2"
                      onClick={() => call(item._id)}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Video call"
                    >
                      <i class="bi bi-camera-video"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
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
export default Patient;
