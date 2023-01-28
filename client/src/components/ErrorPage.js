import React from 'react'
import error from '../images/error.png'
const ErrorPage = ({msg}) => {
  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-middle mt-5'>
      <img style={{height:"500px",width:"500px",marginLeft:"16em"}} src={error} alt='error' />
      <h1 className='text-center' style={{color:"red",fontFamily:"cursive"}}>{msg}</h1>
    </div>
  )
}

export default ErrorPage
