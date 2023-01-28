import React, { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Toast = ({type,message}) => {
    useEffect(() => {
        console.log("type",type);
        if(type==="success"){
            toast.success(message);
        }
        if(type==="error"){
            toast.error(message);
        }
    }, [type,message])
  return (
    <div>
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
  )
}

export default Toast
