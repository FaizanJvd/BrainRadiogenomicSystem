import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FileUpload from "react-material-file-upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UploadScans = () => {
  const [file_t1, setT1] = useState(File[0]);
  const [file_t1Gd, setT1Gd] = useState(File[0]);
  const [file_t2, setT2] = useState(File[0]);
  const [file_flair, setFlair] = useState(File[0]);
  const navigate = useNavigate();
  const { patientId } = useSelector((state) => state.radiologist);
  const formData = new FormData();
  const upload = async (e) => {
    e.preventDefault();
    if (
      file_t1.length === 0 ||
      file_t1Gd.length === 0 ||
      file_t2.length === 0 ||
      file_flair.length === 0
    ) {
      toast.warning("Please upload all the files");
      return;
    }
    if (
      file_t1[0].name.split(".")[1].toLowerCase() !== "nii" ||
      file_t1Gd[0].name.split(".")[1].toLowerCase() !== "nii" ||
      file_t2[0].name.split(".")[1].toLowerCase() !== "nii" ||
      file_flair[0].name.split(".")[1].toLowerCase() !== "nii"
    ) {
      toast.warning("Only .nii files are allowed");
      return;
    }
    formData.append("T1", file_t1[0]);
    formData.append("T1Gd", file_t1Gd[0]);
    formData.append("T2", file_t2[0]);
    formData.append("Flair", file_flair[0]);

    if (
      formData.get("T1") === null ||
      formData.get("T1Gd") === null ||
      formData.get("T2") === null ||
      formData.get("Flair") === null
    ) {
      toast.error("Problem in uploading files");
    } else {
      const res = await fetch("http://127.0.0.1:5000/api/data", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.status === 200) {
        ScansToDb(data.t1, data.t1Gd, data.t2, data.flair);
      } else {
        toast.error("Upload Failed");
      }
    }
  };
  async function ScansToDb(t1, t1Gd, t2, flair) {
    const res = await fetch("http://localhost:4000/scans/addScans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient: patientId,
        t1,
        t1Gd,
        t2,
        flair,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      navigate("/radiologistRoutes/generateReport");
    } else {
      toast.error(data.message);
    }
  }

  return (
    <>
      <h1 className="mt-2">Upload Scans</h1>
      <div className="container d-flex mt-5 p-3">
        <div style={{ width: "50%", padding: "3px", marginBottom: "5px" }}>
          <FileUpload
            title="Upload T1"
            buttonText="Upload T1 Scan [.nii/.nii.gz] allow"
            value={file_t1}
            onChange={setT1}
          />
          <FileUpload
            title="Upload T2"
            buttonText="Upload T2 Scan [.nii/.nii.gz] allow"
            value={file_t2}
            onChange={setT2}
          />
        </div>
        <div style={{ width: "50%", padding: "3px" }}>
          <FileUpload
            title="Upload TGd"
            buttonText="Upload T1Gd Scan [.nii/.nii.gz] allow"
            value={file_t1Gd}
            onChange={setT1Gd}
          />
          <FileUpload
            title="Upload Flair"
            buttonText="Upload Flair Scan [.nii/.nii.gz] allow"
            value={file_flair}
            onChange={setFlair}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary " onClick={upload}>
          Upload
        </button>
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

export default UploadScans;
