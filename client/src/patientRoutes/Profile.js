import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const uploadRef = useRef();
  const [picture, SetPicture] = useState(null);
  const [checkExtension, setCheckExtension] = useState(true);
  const [file, setFile] = useState(null);
  const [editEnable, setEditEnable] = useState(true);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    age: null,
    gender: "",
    phoneNo: null,
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFields({ ...fields, [name]: value });
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async (e) => {
    const res = await fetch("http://localhost:4000/patient/profile", {
      method: "GET",
      headers: {
        Accept: "applicatio/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 201) {
      setFields(data);
      SetPicture(data.picture);
    }
  };
  const editSave = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/patient/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fields,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 201) {
      setEditEnable(true);
      toast.success(data.message);
    }
  };

  const uploadImageClick = async (e) => {
    e.preventDefault();
    uploadRef.current.click();
    uploadRef.current.addEventListener("change", uploadImage);
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    var fileTypes = ["jpg", "jpeg", "png"];
    var extension = e.target.files[0].name.split(".").pop().toLowerCase();
    var isSuccess = fileTypes.indexOf(extension);
    if (isSuccess !== -1) {
      setCheckExtension(true);
    } else {
      toast.warning("Allowed Extenions are PNG, JPGE, JPG");
      setCheckExtension(false);
    }
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file && checkExtension) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          SetPicture(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  });

  const sendImage = async () => {
    if (file !== null && picture !== null) {
      if (checkExtension) {
        const res = await fetch(
          "http://localhost:4000/patient/uploadProfilePicture",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              picture,
            }),
          }
        );
        const data = await res.json();
        if (res.status === 422) {
          toast.error(data.message);
        }
        if (res.status === 201) {
          setFile(null);
          toast.success(data.message);
        }
      } else {
        toast.error("Please upload a valid image file");
      }
    }
  };
  useEffect(() => {
    sendImage();
  }, [picture]);
  return (
    <>
      <div classNamw="mt-5 mb-5" style={{height:"100%"}}>
        <div className="d-flex justify-content-center mt-5">
          <div
            class="col-md-3 border-right"
            style={{ backgroundColor: "#52799b", borderRadius: "50px",height:"35em" }}
          >
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="img-fluid rounded-circle"
                alt="pic"
                style={{ borderRadius: "50%",width:"150px" }}
                src={
                  picture === null
                    ? "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    : picture
                }
              />
              <button
                className="btn btn-outline-info m-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Upload Image"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "rgb(2, 5, 183)",
                  color: "white",
                }}
                onClick={uploadImageClick}
              >
                upload
              </button>
              <input
                type="file"
                className="d-none"
                ref={uploadRef}
                // onChange={uploadImage}
              />
              <span> </span>
            </div>
          </div>
          <div class="col-md-6 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <div className="d-flex">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      name="name"
                      value={fields.name}
                      onChange={handleInput}
                      disabled={editEnable}
                    />
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => setEditEnable(false)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="d-flex">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      value={fields.email}
                      onChange={handleInput}
                      placeholder="Eamil"
                      disabled={editEnable}
                    />
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => setEditEnable(false)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6 mt-3">
                  <div className="d-flex">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Password"
                      name="password"
                      value={fields.password}
                      onChange={handleInput}
                      disabled={editEnable}
                    />
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => setEditEnable(false)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-6 mt-3">
                  <div className="d-flex">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Phone Number"
                      name="phoneNo"
                      value={fields.phoneNo}
                      onChange={handleInput}
                      disabled={editEnable}
                    />
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => setEditEnable(false)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-6 mt-4">
                  <div className="d-flex">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Age"
                      name="age"
                      value={fields.age}
                      onChange={handleInput}
                      disabled={editEnable}
                    />
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => setEditEnable(false)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-6 mt-4">
                  <div className="d-flex">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Gender"
                      name="gender"
                      value={fields.gender}
                      onChange={handleInput}
                      disabled={editEnable}
                    />
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => setEditEnable(false)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-5 text-center d-flex justify-content-center">
                <button
                  class="btn btn-primary profile-button"
                  type="button"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "rgb(2, 5, 183)",
                    color: "white",
                  }}
                  disabled={editEnable}
                  onClick={editSave}
                >
                  Save Profile
                </button>
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
    </>
  );
};

export default Profile;
