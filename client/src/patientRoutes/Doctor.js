import React, { useState, useEffect } from "react";
import pro from "../images/profile.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { chatCreated } from "../redux/userRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctor = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [getDoc, setGetDoc] = useState([]); //{name:"",email:"",specialization:"",age:"",phoneNo:"",gender:"",experience:"",qualification:""});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    const res = await fetch("http://localhost:4000/patient/assignedDoctor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 201) {
      setGetDoc(data);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };
  async function findChat(d_id){
    const res = await fetch("http://localhost:4000/chat/findChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstId: currentUser,
        secondId: d_id,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      dispatch(chatCreated({ recieverId: d_id, chatId: data._id }));
      Navigate("/patientRoutes/chat");
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };
  function call (d_id) {
    dispatch(chatCreated({ recieverId: d_id }));
    Navigate("/patientRoutes/videoCall");
  };
  return (
    <div className="p-3 mt-4">
      {getDoc.map((item) => {
        return (
          <div className="container shadow p-3 mb-5 bg-body rounded">
            <div className="d-flex flex-column ms-3">
              <div>
                <h1>{item.name == null ? "" : item.name}</h1>
              </div>
              <div>
                <h5>
                  {item.specialization == null ? "" : item.specialization}
                </h5>
              </div>
            </div>

            <div className="mt-4 d-flex ms-3">
              <div className="flex-column">
                <div>
                  <img
                    className="rounded-circle"
                    style={{ widht: "12rem", height: "12rem" }}
                    src={item.picture!=null?item.picture:pro}
                    alt="Image"
                  />
                </div>
                <div className="mt-3 ms-3">
                  <ul className="d-flex" style={{ listStyle: "none" }}>
                    <li>
                      <i className="bi bi-facebook"></i>
                    </li>
                    <li className="ms-1">
                      <i className="bi bi-twitter"></i>
                    </li>
                    <li className="ms-1">
                      <i className="bi bi-linkedin"></i>ٖ
                    </li>
                  </ul>
                </div>
              </div>
              <div
                style={{ width: "20rem", padding: "10px", marginLeft: "20px" }}
              >
                <p className="text-wrap">
                  The doctor always gives honest advice to his patients. He also
                  gives us some necessary medicines according to our disease. We
                  should follow his description seriously.
                  <br /> We often begin treating a member of our family instead
                  of visiting a doctor. It is not good, and our mistake may put
                  him in a more chronic situation. We should never avoid
                  visiting a doctor. He is the only person who can cure us and
                  make us healthy again.
                </p>
              </div>
              <div className="shadow-lg p-3 mb-5 bg-body rounded ms-3">
                <div className="mt-2">
                  <h3>
                    <u>Profile Details</u>
                  </h3>
                </div>
                <div className="row">
                  <div className="col fw-bold mt-3">
                    <div>qualification</div>
                    <div className="mt-2">Email</div>
                    <div className="mt-2">Phone Number</div>
                    <div className="mt-2">Experience</div>
                    <div className="mt-2">Age</div>
                    <div className="mt-2">Gender</div>
                  </div>
                  <div className="col ms-4 mt-3">
                    <div>
                      {item.qualification == null ? "" : item.qualification}
                    </div>
                    <div className="mt-2">
                      {item.email == null ? "" : item.email}
                    </div>
                    <div className="mt-2">
                      {item.phoneNo == null ? "" : item.phoneNo}
                    </div>
                    <div className="mt-2">
                      {item.experience == null ? "" : item.experience}
                    </div>
                    <div className="mt-2">
                      {item.age == null ? "" : item.age}
                    </div>
                    <div className="mt-2">
                      {item.gender == null ? "" : item.gender}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-danger m-2" onClick={()=>{findChat(item._id)}}>
                <i class="bi bi-chat-quote mx-1"></i> Chat
              </button>
              <button className="btn btn-outline-primary m-2 ms-2" onClick={()=>call(item._id)}><i class="bi bi-camera-video mx-1"></i> video</button>
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

export default Doctor;
