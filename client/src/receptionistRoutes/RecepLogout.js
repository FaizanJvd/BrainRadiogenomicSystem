import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const RecepLogout = () => {
    const Navigate = useNavigate();
    useEffect(()=>{
        logout();
    },[])
    const logout = ()=>{
        fetch('/receptionist/logout',{
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

export default RecepLogout
