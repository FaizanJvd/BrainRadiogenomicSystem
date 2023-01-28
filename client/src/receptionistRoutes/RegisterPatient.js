import React, { useState } from "react";
import "../styles/receptionistStyles/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { patientId } from "../redux/recpReducer";
const RegisterPatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerEmail, setRegEmail] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: null,
    phoneNo: null,
    gender: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value; //    ... is seperator opreator used to access all variable of user object, [] is used to change value dinamicaly
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault(); // to pervent reloading issues.
    const { name, email, age, phoneNo, gender, password, cpassword } = user; // its object decontructuring.
    const res = await fetch(
      "http://localhost:4000/receptionist/register/patient",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          phoneNo,
          gender,
          password,
          cpassword,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 201) {
      const pt_id = await fetch(
        "http://localhost:4000/receptionist/getPatientId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const id = await pt_id.json();
      if (pt_id.status === 201) {
        toast.success("Registered Successfully");
        dispatch(patientId({currentPatient:id._id}));
        navigate("/receptionistRoutes/symptoms");
      }
    }
  };
  const ModelSubmitClick = async (e) => {
    e.preventDefault();
    if (registerEmail === null) {
      toast.warning("Enter Email");
    } else {
      const pt_id = await fetch(
        "http://localhost:4000/receptionist/getPatientId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email:registerEmail,
          }),
        }
      );
      const id = await pt_id.json();
      if (pt_id.status === 201) {
        dispatch(patientId({currentPatient:id._id}));
        navigate("/receptionistRoutes/symptoms");
      }
      if(pt_id.status===422){
       toast.error(id.message);
      }
    }
  };
  return (
    <div>
      <div>
        <div className="Container_heading">Registration Form</div>
        <form>
          <div className="Form_container">
            <div className="Form_input">
              <span>Name</span>
              <input
                className="Input"
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleInput}
                value={user.name}
              ></input>
            
              <span>Email</span>
              <input
                className="Input"
                type="text"
                placeholder="Enter Email"
                required="true"
                name="email"
                onChange={handleInput}
                value={user.email}
              ></input>
            </div>
            <div className="Form_input">
              <span>phoneNo</span>
              <input
                className="Input"
                type="Number"
                placeholder="Enter Number"
                name="phoneNo"
                onChange={handleInput}
                value={user.phoneNo}
              ></input>
              <span>Age</span>
              <input
                className="Input"
                type="Number"
                placeholder="Enter Age"
                name="age"
                onChange={handleInput}
                value={user.age}
              ></input>
            </div>
            <div className="Form_input">
              <span>Password</span>
              <input
                className="Input"
                type="password"
                name="password"
                onChange={handleInput}
                value={user.password}
              ></input>
              <span>Confirm Password</span>
              <input
                className="Input"
                type="cpassword"
                name="cpassword"
                onChange={handleInput}
                value={user.cpassword}
              ></input>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <label className="Radio_title mx-3">Gender</label>
            <div className="px-3">
              <input
              className="mx-2"
                type="radio"
                value="Male"
                name="gender"
                onChange={handleInput}
              />
              Male
              <input
                type="radio"
                className="mx-2"
                value="Female"
                name="gender"
                onChange={handleInput}
              />
              Female
              <input
                type="radio"
                className="mx-2"
                value="other"
                name="gender"
                onChange={handleInput}
              />
              Other
            </div>
          </div>
          <div className="Btn_div">
            <button type="button" style={{width:'140px'}} className="btn btn-primary" onClick={postData}> Register </button>
          </div>
        </form>
        <div className="Btn_div">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
           
          >
            Already Register
          </button>
        </div>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#3a3d42" }}>
            {/* <!-- Modal Header --> */}
            <div
              className="modal-header"
              style={{ backgroundColor: "lightgrey" }}
            >
              <h2 className="modal-title" style={{ color: "black" }}>
                Register Patient
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="container">
              <form>
                <div style={{ marginLeft: "25%" }}>
                  <input
                    type="email"
                    placeholder="Enter Registered Email"
                    required="true"
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "15px", marginLeft: "40%" }}>
                  <button type="button"
                data-bs-dismiss="modal" onClick={ModelSubmitClick}>Submit</button>
                </div>
              </form>
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
    </div>
  );
};

export default RegisterPatient;
