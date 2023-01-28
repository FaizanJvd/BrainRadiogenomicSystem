import React, { useState } from "react";
// import docPic from "../images/doctor.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterDoctor = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: null,
    phoneNo: null,
    gender: "",
    experience: null,
    qualification: "",
    specialization:"",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    //    ... is seperator opreator used to access all variable of user object, [] is used to change value dinamicaly
    setUser({ ...user, [name]: value });
  };

const sendCredendialsMail = async ()=>{
  console.log("Enter to mial"+user.email);
    const res = await fetch("http://localhost:4000/sendCredendials/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        m_email:user.email,
        m_password:user.password
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    } 
    if (res.status === 200) {
      toast.success(data.message);
    }
};

  const postData = async (e) => {
    e.preventDefault(); // to pervent reloading issues.
    const {
      name,
      email,
      age,
      phoneNo,
      gender,
      experience,
      qualification,
      specialization,
      password,
      cpassword,
    } = user; // its object decontructuring.
    const res = await fetch("http://localhost:4000/register/doctor", {
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
        experience,
        qualification,
        specialization,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    } 
    if (res.status === 201) {
      toast.success(data.message);
      sendCredendialsMail();
    }
  };
  return (
    <>
      <div>
        <section>
        {/* backgroundImage:`url(${docPic})` */}
          <div className="container py-3" >
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{
                    borderRadius: "15px",
                    // backgroundColor: "ghostwhite",
                  }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5" style={{fontFamily:"sans-serif"}}>
                      Doctor Registration Form
                    </h3>
                    <form method="POST" onSubmit={postData}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-lg"
                              required
                              pattern="[A-Za-z ]{3,}"
                              onChange={handleInput}
                              value={user.name}
                            />
                            <label className="form-label" htmlFor="name">
                              Name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-lg"
                              required
                              pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                              onChange={handleInput}
                              value={user.email}
                            />
                            <label className="form-label" htmlFor="email">
                              Email
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 d-flex align-items-center">
                          <div className="form-outline datepicker w-100">
                            <input
                              type="Number"
                              className="form-control form-control-lg"
                              name="age"
                              required
                              pattern="[0-9]{2,3}"
                              onChange={handleInput}
                              value={user.age}
                            />
                            <label htmlFor="age" className="form-label">
                              Age
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <h6 className="mb-2 pb-1">gender: </h6>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"

                              onChange={handleInput}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="female"
                            >
                              Female
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              onChange={handleInput}
                            />
                            <label className="form-check-label" htmlFor="male">
                              Male
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="other"
                              value="other"
                              onChange={handleInput}
                            />
                            <label className="form-check-label" htmlFor="other">
                              Other
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">

                            <input
                              type="tel"
                              name="phoneNo"
                              className="form-control  form-control-lg"
                              required="true"
                              onChange={handleInput}
                              placeholder="+92XXXXXXXXXX"
                              pattern="[0-9]{11}"
                              value={user.phoneNo}
                            />
                            <label className="form-label" htmlFor="phoneNo">
                              PhoneNo
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="specialization"
                              className="form-control form-control-lg"
                              required
                              pattern="[A-Za-z ]{3,}"

                              onChange={handleInput}
                              value={user.spcialization}
                            />
                            <label className="form-label" htmlFor="specialization">
                              specialization
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="Number"
                              name="experience"
                              className="form-control form-control-lg"
                              required
                              pattern="[0-9]{1,2}"
                              onChange={handleInput}
                              value={user.experience}
                            />
                            <label className="form-label" htmlFor="experience">
                              Experience
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="qualification"
                              className="form-control form-control-lg"
                              required
                              pattern="[A-Za-z ]{3,}"
                              onChange={handleInput}
                              value={user.qualification}
                            />
                            <label
                              className="form-label"
                              htmlFor="qualification"
                            >
                              Qualification
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="password"
                              name="password"
                              className="form-control form-control-lg"
                              required
                              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                              onChange={handleInput}
                              value={user.password}
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="password"
                              name="cpassword"
                              className="form-control form-control-lg"
                              required
                              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                              onChange={handleInput}
                              value={user.cpassword}
                            />
                            <label className="form-label" htmlFor="cpassword">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center pt-2">
                        <input
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    </>
  );
};

export default RegisterDoctor;
