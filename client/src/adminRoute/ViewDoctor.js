import React, { useEffect, useState } from "react";
import pro from "../images/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewDoctor = () => {
  const [result, setResult] = useState(null);
  const [redarFlag, setRedarFlag] = useState(false);
  const [user, setUser] = useState({
    u_id: null,
    name: "",
    email: "",
    phoneNo: null,
    qualification: "",
    password: "",
    cpassword: "",
  });
  function editId(id) {
    user.u_id = id;
  }
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault(); // to pervent reloading issues.
    const { u_id, name, email, phoneNo, qualification, password, cpassword } =
      user; // its object decontructuring.
    const res = await fetch("http://localhost:4000/updateDoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        u_id,
        name,
        email,
        phoneNo,
        qualification,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    } else if (res.status === 201) {
      toast.success("Updated Success");
    } else {
      toast.error("Some Error");
    }
  };

  useEffect(() => {
    getData();
  }, [redarFlag]);

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

  async function deleteclickedFunction(d_id) {
    const res = await fetch("http://localhost:4000/deleteDoctor", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        d_id,
      }),
    });
    const data = await res.json();
    if (data.status === 422) {
      toast.error(data.message);
    } else {
      setRedarFlag(!redarFlag);
      toast.success(data.message);
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
      <div className="container-fluid px-5">
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
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Specialization</th>
            <th scope="col">Qualification</th>
            <th scope="col">Experience</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
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
                      <span className="ms-1">{`Dr.${result.name}`}</span>
                    </div></td>
                  <td>{result.email}</td>
                  <td>{result.specialization}</td>
                  <td>{result.qualification}</td>
                  <td>{result.experience}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary mx-auto"
                      data-bs-toggle="modal"
                      style={{ borderRadius: "20px" }}
                      data-bs-target="#myModal"
                      onClick={() => editId(result._id)}
                    >
                      <i class="bi bi-pen-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger mx-auto"
                      style={{ borderRadius: "20px" }}
                      onClick={() => deleteclickedFunction(result._id)}
                    >
                      <i class="bi bi-trash-fill"></i>
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
              <h4 className="modal-title">Edit Profile</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            {/* <div className="modal-body">{u_id}</div> */}
            <div className="container">
              <form method="POST">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-outline">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        required
                        name="name"
                        onChange={handleInput}
                        value={user.name}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        required
                        name="email"
                        onChange={handleInput}
                        value={user.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-outline">
                      <label htmlFor="phoneNo" className="form-label">
                        PhoneNo
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        name="phoneNo"
                        onChange={handleInput}
                        value={user.phoneNo}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline">
                      <label htmlFor="qualification" className="form-label">
                        Qualification
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="qualification"
                        onChange={handleInput}
                        value={user.qualification}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-outline">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        onChange={handleInput}
                        value={user.password}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline">
                      <label htmlFor="cpassword" className="form-label">
                        confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="cpassword"
                        onChange={handleInput}
                        value={user.cpasssword}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success"
                value="submit"
                onClick={postData}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
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
    </>
  );
};

export default ViewDoctor;
