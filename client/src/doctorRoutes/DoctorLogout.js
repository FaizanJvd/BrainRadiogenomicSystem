import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {loginSuccess,chatCreated} from '../redux/userRedux'

const DoctorLogout = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    useEffect(()=>{
        dispatch(loginSuccess({currentUser:null}));
        dispatch(chatCreated({recieverId:null,chatId:null}));
        logout();

        
    },[])
    const logout = ()=>{
        fetch('/doctor/logout',{
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

export default DoctorLogout

