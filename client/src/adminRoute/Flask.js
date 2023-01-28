// import React, { useState } from "react";
// const Flask = () => {
//   // const [val,setVal] = useState('')
//   // const show = async ()=>{
//   //     const res = await fetch("http://127.0.0.1:5000/api", {
//   //         method: "GET",
//   //         headers: {
//   //         "Content-Type": "application/json",
//   //         },
//   //     });
//   //     const data = await res.json();
//   //     setVal(data);
//   // }
//   //  const upload= async (e)=>{
//   //       e.preventDefault();
//   //       const formData = new FormData();
//   //       formData.append('img',e.target.files[0])
//   //       const res = await fetch("http://127.0.0.1:5000/api/data", {
//   //       method: "POST",
//   //       body:formData
//   //   });
//   //   }

//   return (
//     <>
//       <div className="container-fluid">
//         {/* <input type='file' onChange={(e)=>upload(e)} name='img'/> */}
//         <embed src="https://viewer.ohif.org/embed/local"  title="Dicom Viewer" />
//       </div>
//     </>
//   );
// };

// export default Flask;

import React from "react";

const Flask = () => {
  const data = [
    { title: "Vedio1" },
    { title: "Vedio2" },
    { title: "Vedio3" },
    { title: "Vedio4" },
  ];
  return <div className="contaier">
    <h1>Videos</h1>
    <hr/>
    <table className="table table-striped table-hover table-bordered" style={{width:'50%',marginLeft:"17em"}}>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Play</th>
          <th scope="col">Delete</th>
        </tr>
        </thead>
        {data.map((item) => {
          return (
            <tbody>
              <tr>
                <td>{item.title}</td>
                <td>
                  <button className="btn btn-primary">Play</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          );})}
      </table>
  </div>;
};

export default Flask; 
