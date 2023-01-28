import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
const DocForgetPassword = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edisabled, setEdisabled] = useState(false);
  const [pdisabled, setPdisabled] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
    const verifyEmail =async (e) => {
        e.preventDefault();
        const res =await fetch("http://localhost:4000/doctor/verifyEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        const data = await res.json();
        if (data.message === "Email Verified") {
            setEdisabled(true);
            setPdisabled(false);
        }
        else {
            alert("Email Not Verified");
        }
    }
    const updatePassword = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/doctor/updatePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        const data = await res.json();
        alert(data.message);
        if (data.message === "Password Updated") {
            alert("Password Updated");
            navigate("/doctorLogin");
        }
        else {
            alert("Password Not Updated");
        }
    }


  return (
    <div>
      <Modal
        open={true}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Forget Password
          </Typography>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            hidden={edisabled}
          />
          <input
            type="password"
            placeholder="Enter your new password"
            onChange={(e) => setPassword(e.target.value)}
            hidden={pdisabled}
          />
          <button
            class="btn btn-info mt-2"
            onClick={verifyEmail}
            hidden={edisabled}
          >
            Verify
          </button>
          <button class="btn btn-primary mt-2" hidden={pdisabled} onClick={updatePassword}>
            Update
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default DocForgetPassword;
