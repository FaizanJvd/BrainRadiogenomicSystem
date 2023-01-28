import React, { useState, useEffect } from "react";
import back from "../images/back.jpg";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GenerateReport = () => {
  const [fields, setFields] = useState({});
  const [segmentation, setSegmentation] = useState(null);
  const [original, setOriginal] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
  const [done, setDone] = useState(true);
  const { currentUser, patientId, doctorId } = useSelector(
    (state) => state.radiologist
  );
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFields({ ...fields, [name]: value });
  };
  useEffect(() => {
    handleSegmentation();
  }, []);
  const handleSegmentation = async () => {
    const res = await fetch("http://localhost:5000/segmentation", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setSegmentation(data.segmentation);
      setOriginal(data.original);
      handleFeatures();
    } else {
      toast.error("Segmentation failed");
    }
  };

  const handleFeatures = async () => {
    const res = await fetch("http://localhost:5000/features", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setFields(data);
      setDone(false);
    } else {
      toast.error("Feature extraction failed");
    }
  };

  const uploadReport = async (e) => {
    e.preventDefault();
    const {
      autocorrelation,
      cluster_tendency,
      contrast,
      difference_entropy,
      difference_variance,
      joint_avg,
      joint_entropy,
      kurtosis,
      mesh_volume,
      skewness,
      IDH,
      TCP53,
      survival,
    } = fields;
    const res = await fetch("http://localhost:4000/report/addReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient: patientId,
        radiologist: currentUser,
        doctor: doctorId,
        segmentation,
        original,
        autocorrelation,
        cluster_tendency,
        contrast,
        difference_entropy,
        difference_variance,
        joint_average: joint_avg,
        joint_entropy,
        kurtosis,
        mesh_volume,
        skewness,
        IDH_mutation: IDH,
        TCP53_mutation: TCP53,
        survival,
        remarks,
        status,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      toast.success("Report generated successfully");
    } else {
      toast.error("Report generation failed");
    }
  };

  return (
    <>
      {done ? (
        <div className=" text-primary" style={{marginTop:"18em",marginLeft:"25em"}}>
          <div style={{width:"150px",height:"150px",marginLeft:"6em"}} class="spinner-border" role="status">
          </div>
            <h5 >Generating Report. It may take 4 to 5 minutes ...</h5>
        </div>
      ) : (
        <div className="container-fluid mt-2 p-3">
          <h1>Generate Report</h1>
          <hr />
          <div>
            <div className="row mt-4">
              <div className="col-md-12">
                <img
                  style={{ height: "220px", width: "220px" }}
                  src={segmentation == null ? back : segmentation}
                  alt="seg"
                ></img>
                <img
                  className="ms-3"
                  style={{ height: "220px", width: "220px" }}
                  src={original == null ? back : original}
                  alt="original"
                ></img>
              </div>
            </div>

            <div className="row mt-4">
              <h4>Features</h4>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4 fw-bold">
                    <label>AutoCorrelation</label>
                    <br />
                    <label className="mt-4">Cluster Tendency</label>
                    <br />
                    <label className="mt-4">contrast</label>
                    <br />
                    <label className="mt-4">Difference Entropy</label>
                    <br />
                    <label className="mt-4">Difference Variance</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="autocorrelation"
                      value={fields.autocorrelation}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="cluster_tendency"
                      value={fields.cluster_tendency}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="contrast"
                      value={fields.contrast}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="difference_entropy"
                      value={fields.difference_entropy}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="difference_variance"
                      value={fields.difference_variance}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-3 fw-bold">
                    <label>joint Average</label>
                    <br />
                    <label className="mt-4">Joint Entropy</label>
                    <br />
                    <label className="mt-4">Kurtosis</label>
                    <br />
                    <label className="mt-4">Mesh Volume</label>
                    <br />
                    <label className="mt-4">Skewness</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="joint_avg"
                      value={fields.joint_avg}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="joint_entropy"
                      value={fields.joint_entropy}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="kurtosis"
                      value={fields.kurtosis}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="mesh_volume"
                      value={fields.mesh_volume}
                      onChange={handleInput}
                    />
                    <input
                      className="mt-2 form-control"
                      type="text"
                      name="skewness"
                      value={fields.skewness}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <h4>Mutations</h4>
              <div className="col-md-3">
                <label className="fw-bold ms-2">IDH-mutation</label>
                <input
                  className="ms-2 form-control"
                  type="text "
                  name="IDH"
                  value={fields.IDH}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-3">
                <label className="fw-bold ms-2">TCP53-mutation</label>
                <input
                  className="ms-2 form-control"
                  type="text"
                  name="TCP53"
                  value={fields.TCP53}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-3">
                <label className="fw-bold ms-2">Survial Days</label>
                <input
                  className="ms-2 form-control"
                  type="text"
                  name="survival"
                  value={fields.survival}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <h4>Remarks</h4>
                <textarea
                  rows="4"
                  cols="50"
                  name="comment"
                  form="usrform"
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "25em" }}>
            <div className="fw-bold">
              <label>Status</label>
              <input
                className="ms-2"
                name="status"
                type="radio"
                value="ok"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
              <label className="ms-1" style={{ color: "green" }}>
                Ok
              </label>
              <input
                className="ms-2"
                name="status"
                type="radio"
                value="defected"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
              <label className="ms-1" style={{ color: "red" }}>
                Defected
              </label>
            </div>
            <button className="btn btn-primary mt-2" onClick={uploadReport}>
              Generate
            </button>
          </div>
        </div>
      )}
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

export default GenerateReport;
