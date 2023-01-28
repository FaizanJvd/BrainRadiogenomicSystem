import React,{useState} from "react";
import "../styles/receptionistStyles/SymptomForm.css";
import {useSelector} from "react-redux";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SymptomsForm = () => {
  const navigate = useNavigate();
  const [SymptomList,setSymptomsList] = useState([]);
  const p_id = useSelector((state)=> state.recp.currentPatient);
  const handleChange =(e)=>{
    const value = e.target.value;
    const checked = e.target.checked;
    if(checked){
      setSymptomsList([
        ...SymptomList,value
      ])
    }
    else{
      setSymptomsList(SymptomList.filter((e)=>(e!==value)));
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:4000/receptionist/register/symptoms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_id,
        symptoms:SymptomList
      }),
    });
    const data = await res.json();
    if(data.message==="Symptoms Added"){
      navigate("/receptionistRoutes/assignDoctor");
    }
    if(data.status===422){
      toast.error(data.message);
    }
  }
  return (
    <div className="Main_container">
      <div className="Container">
        <div className="Heading">Symptoms from</div>
        <from>
          <div className="Sym_Form_container">
            <div className="Group">
              <input type="checkbox" name="Symptom" value="Vision Problem" onChange={handleChange}/>
              <label className="MyLabel"  htmlFor="cBox">Vision problems</label>
            </div>

            <div className="Group">
              <input type="checkbox" name="Symptom" value="Loss of sensation" onChange={handleChange}/>
              <label className="MyLabel" htmlFor="cBox">Loss of sensation</label>
            </div>
            <div className="Group">
              <input type="checkbox" name="Symptom" value="Headaches" onChange={handleChange}/>
              <label className="MyLabel" htmlFor="cBox">Headaches</label>
            </div>
            <div className="Group">
              <input type="checkbox" name="Symptom" value="Difficulty with balance" onChange={handleChange}/>
              <label className="MyLabel" htmlFor="cBox">Difficulty with balance</label>
            </div>
            <div className="Group">
              <input type="checkbox" name="Symptom" value="vomiting" onChange={handleChange}/>
              <label className="MyLabel" htmlFor="cBox"> vomiting</label>
            </div>
            <div className="Group">
              <input type="checkbox" name="Symptom" value="Seizures" onChange={handleChange}/>
              <label className="MyLabel" htmlFor="cBox"> Seizures</label>
            </div>
          </div>
          <div className="btn">
            <button className='btn btn-primary' onClick={handleSubmit}> Submit </button>
          </div>
        </from>
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
  );
};

export default SymptomsForm;
