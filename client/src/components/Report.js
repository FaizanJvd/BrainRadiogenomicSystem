import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import back from "../images/back.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const Report = () => {
  const pdfRef = useRef(null);
  const location = useLocation();
  const navigate  = useNavigate();
  const [result, setResult] = useState({});
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [radiologist, setRadiologist] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const handleDownload = () => {
    const content = pdfRef.current;

    const doc = new jsPDF("l", "pt", "tabloid", true);
    doc.html(content, {
      callback: function (doc) {
        doc.save("Report.pdf");
      },
    });
  };
  useEffect(() => {
    getReport();
  }, []);
  const getReport = async () => {
    const response = await fetch("http://localhost:4000/report/getReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient: location.state.id,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      setResult(data);
      setPatientName(data.patient.name);
      setDoctor(data.doctor.name);
      setRadiologist(data.radiologist.name);
      setDate(data.date);
    }
    if (response.status === 422) {
      setError(true);
    }
  };
  if(error){
    return <ErrorPage msg="No report found"/>
  }
  return (
    <>
      {patientName=="" ? (
        <h1>No</h1>
      ) : (
        <div ref={pdfRef} className="p-3 vh-100">
          <div className="d-flex justify-content-between">
            <div className="row mt-5">
              <div className="col-md-6  fw-bold">
                <label className="mt-2">Patient</label>
                <br />
                <label className="mt-2">Doctor</label>
                <br />
                <label className="mt-2">Radiologist</label>
                <br />
                <label className="mt-2">Status</label>
                <br />
                <label className="mt-2">Date</label>
              </div>
              <div className="col-md-6">
                <label className="mt-2">{patientName}</label>
                <br />
                <label className="mt-2">{doctor}</label>
                <br />
                <label className="mt-2">{radiologist}</label>
                <br />
                <label className="mt-2">{result.status}</label>
                <br />
                <label className="mt-2">{date.split("T")[0]}</label>
              </div>
            </div>
            <div>
              <img
                style={{ height: "220px", width: "220px" }}
                src={result.segmentation}
                alt="img"
              ></img>
              <img
                className="ms-2 mx-5"
                style={{ height: "220px", width: "220px" }}
                src={result.original}
                alt="img"
              ></img>
            </div>
          </div>

          <div className="row mt-1">
            <h4 className="text-primary">Features</h4>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6  fw-bold">
                  <label>AutoCorrelation</label>
                  <br />
                  <label className="mt-3">Cluster Tendency</label>
                  <br />
                  <label className="mt-3">contrast</label>
                  <br />
                  <label className="mt-3">Difference Entropy</label>
                  <br />
                  <label className="mt-3">Difference Variance</label>
                </div>
                <div className="col-md-6">
                  <label>{result.autocorrelation}</label>
                  <br />
                  <label className="mt-3">{result.cluster_tendency}</label>
                  <br />
                  <label className="mt-3">{result.contrast}</label>
                  <br />
                  <label className="mt-3">{result.difference_entropy}</label>
                  <br />
                  <label className="mt-3">{result.difference_variance}</label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3 fw-bold">
                  <label>Joint Average</label>
                  <br />
                  <label className="mt-3">Joint Entropy</label>
                  <br />
                  <label className="mt-3">Kurtosis</label>
                  <br />
                  <label className="mt-3">Mesh Volume</label>
                  <br />
                  <label className="mt-3">Skewness</label>
                </div>
                <div className="col-md-3">
                  <label>{result.joint_average}</label>
                  <br />
                  <label className="mt-3">{result.joint_entropy}</label>
                  <br />
                  <label className="mt-3">{result.kurtosis}</label>
                  <br />
                  <label className="mt-3">{result.mesh_volume}</label>
                  <br />
                  <label className="mt-3">{result.skewness}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <h4 className="text-primary">Mutations</h4>
            <div className="col-md-4">
              <label className="fw-bold">IDH mutation</label>
              <label className="ms-2">{result.IDH_mutation}</label>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">TCP53 mutation</label>
              <label className="ms-2">{result.TCP53_mutation}</label>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">Survival Days</label>
              <label className="ms-2">{result.survival}</label>
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-primary">Remarks</h4>
            <textarea
              rows="5"
              cols="50"
              name="comment"
              form="usrform"
              value={result.remarks}
              disabled
            ></textarea>
          </div>
        </div>
      )}
      <div className="p-2" style={{ marginLeft: "25em" }}>
        <button onClick={handleDownload} className="btn btn-primary" hidden={patientName?false:true}>
          Download
        </button>
      </div>
    </>
  );
};

export default Report;
