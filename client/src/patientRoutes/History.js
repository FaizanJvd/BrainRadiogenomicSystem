import React,{useState,useEffect} from 'react'
import pro from "../images/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from 'dayjs'
const History = () => {
    const [history,setHistory] = useState([])
    useEffect(()=>{
        getHistory();
    },[])
    const getHistory = async () => {
        const res = await fetch("http://localhost:4000/patient/getHistory",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        const data = await res.json()
        if(res.status === 201){
          console.log(data);
            setHistory(data)
        }
        if(res.status === 422){
            toast.error(data.message)
        }
    }
  return (
    <div className="px-5">
      <table className="table  table-bordered table-striped table-hover" style={{borderRadius: "1em",overflow: "hidden"}}>
        <thead style={{backgroundColor:"rgb(88 105 173)",color:"white"}}>
            <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Prescription</th>
                <th>Recommendation</th>
            </tr>
        </thead>
        {history.map((item)=>{
            return(
                <tbody>
                    <tr>
                        <td><div className="d-flex">
                      <img
                        className="rounded-circle"
                        src={item.doctor.picture!=null?item.doctor.picture:pro}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="ms-1">{item.doctor.name}</span>
                    </div></td>
                        <td>{item.doctor.specialization}</td>
                        <td>{dayjs( item.createdAt).format('DD/MM/YYYY')}</td>
                        <td><textarea value={item.prescription} readOnly/></td>
                        <td><textarea value={item.recommendation} readOnly/></td>
                    </tr>
                </tbody>
            )
        })}
        </table>
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

export default History