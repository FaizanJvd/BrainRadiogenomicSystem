import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {radiologistId} from "../redux/radiologistReducar";
import { docAndPatId } from "../redux/radiologistReducar";
import { useDispatch } from 'react-redux';
const RadiologistLogout = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        logout();
        dispatch(radiologistId({currentUser:null}));
        dispatch(docAndPatId({patientId:null,doctorId:null}))

    },[])
    const logout = ()=>{
        fetch('/radiologist/logout',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
    });
    Navigate('/');
}
  return (
    <div>
      
    </div>
  )
}

export default RadiologistLogout
