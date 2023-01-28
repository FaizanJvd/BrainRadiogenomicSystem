import React,{useState} from "react";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import recepImg from "../images/recepLogin.svg";
import logo from "../images/brain.png";
const ReceptionistLogin = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ email: "", password: "" });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    //    ... is seperator opreator used to access all variable of user object, [] is used to change value dinamicaly
    setFields({ ...fields, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault(); // to pervent reloading issues.
    const { email, password } = fields; // its object decontructuring.
    const res = await fetch("http://localhost:4000/receptionist/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 201) {
      navigate('/receptionistRoutes/');
    }
  };
  return (
    <div className="container"  style={{marginTop:"10rem"}}>
      <div className="row">
        <div className="col-md-6">
          <img
            src={recepImg}
            alt=".."
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div style={{display:'grid',justifyContent:"center"}}>
                <img src={logo} alt=".." style={{marginLeft:"30%"}}/>
                <h3>Welcome Back!</h3>
                <p className="text-center">Sign in to your account</p>
              </div>
              <form style={{marginTop:'2em'}} onSubmit={postData}>
              <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name='email'
                pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                required
                value={fields.email}
                onChange={handleInput}
              />
              <label style={{ color: "royalblue" }} htmlFor="floatingInput">
                Email Address
              </label>
            </div>
            <div className="form-floating mb-1">
              <input
                type="password"
                className="form-control"
                name='password'
                required
                value={fields.password}
                onChange={handleInput}
              />
              <label style={{ color: "royalblue" }} htmlFor="floatingInput">
                password
              </label>
            </div>
            <p className="text-end " style={{color:'royalblue'}}>Forget password?</p>
            <input
              type="submit"
              value="Login"
              class="py-3 w-100 mb-4"
              style={{borderRadius:"20px", backgroundColor:"#2196f3", color:"white"}}
            />
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

export default ReceptionistLogin;
