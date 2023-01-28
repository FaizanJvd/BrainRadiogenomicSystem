import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import pro from "../images/profile.png";
const AdminViewReports = () => {
    const [result,setResult] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    },[]);
    const getData = async () => {
        const response = await fetch('http://localhost:4000/report/getAllReports',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        setResult(data);
        console.log(data);
    }
    function viewReport(id){
        navigate('/admin/viewReport/',{state:{id:id}});
    }
    const filterReports = async (value) => {
        if(value === '' || value === "all"){
          getData();
        }else{
          const res = await fetch("http://localhost:4000/filter/filterReport", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status:value,
            }),
          });
          const data = await res.json();
          setResult(data);
        }
    
      }
  return (
    <>
    <div className="container-fluid px-5">

        <div className='mt-2 mb-1 mx-2 input-group d-flex justify-content-end'>
            <select class="custom-select"
            id="inputGroupSelect04" style={{ width: "400px",height:"35px" }} onChange={(e)=>filterReports(e.target.value)}>
                <option value=''>Select Status</option>
                <option value='ok'>OK</option>
                <option value='defected'>Defected</option>
                <option value='all'>All</option>
            </select>
        </div>
    </div>
        <div className='px-5'>

      <table className="table  table-bordered table-striped table-hover" style={{borderRadius: "1em",overflow: "hidden"}}>
        <thead style={{ backgroundColor: "rgb(88 105 173)", color: "white" }}>
            <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Radiologist Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>View</th>
            </tr>
        </thead>
        {
            result.map((item)=>{
                return(
                    <tbody >
                        <tr>
                            <td><div className="d-flex">
                      <img
                        className="rounded-circle"
                        src={item.patient.picture!=null?item.patient.picture:pro}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="ms-1">{item.patient.name}</span>
                    </div></td>
                            <td>{`Dr.${item.doctor.name}`}</td>
                            <td>{item.radiologist.name}</td>
                            <td>{item.date.split("T")[0]}</td>
                            <td style={{color:item.status=='ok'?'green':'red',fontWeight:500}}>{item.status}</td>
                            <td><button className='btn btn-primary mx-auto' onClick={()=>{viewReport(item.patient._id)}}><i class="bi bi-eye-fill"></i></button></td>
                        </tr>
                    </tbody>
                )
              })
            }
      </table>
            </div>
    </>
  )
}

export default AdminViewReports
