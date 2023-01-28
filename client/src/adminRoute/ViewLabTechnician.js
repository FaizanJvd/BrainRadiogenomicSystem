import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewLabTechnician = () => {
  const [result, setResult] = useState(null);

  const [user,setUser] = useState({u_id:null,name:"",email:"",phoneNo:null,qualification:"",password:"",cpassword:""});
  function editId(id){
    user.u_id = id;
  }
  let name,value;
  const handleInput = (e)=>{
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault(); // to pervent reloading issues.
    const {
      u_id,
      name,
      email,
      phoneNo,
      qualification,
      password,
      cpassword,
    } = user; // its object decontructuring.
    const res = await fetch("http://localhost:4000/updateLabTechnician", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        u_id,
        name,
        email,
        phoneNo,
        qualification,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    } 
    else if(res.status === 201) {
      toast.success(data.message);
      window.location.reload();
    }
    else{
      toast.error("Some Error");
    }
  };


  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch("http://localhost:4000/getLabTechnician", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setResult(data);
  }

  async function deleteclickedFunction(d_id) {
    const res = await fetch("http://localhost:4000/deleteLabTechnician", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        d_id,
      }),
    });
    const data = await res.json();
    if (data.status === 422) {
        toast.error(data.message);
    } else {
      window.location.reload();
      toast.success(data.message);
    }
  }
  return (
    <>
      <table className="table table-dark table-hover" style={{width:'82%',marginLeft:"17em"}}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Qualification</th>
            <th scope="col">Experience</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {result===null ? (
          <tr>
            <td>No Record </td>
          </tr>
        ) : (
          result.map((result) => {
            // const { id, name, email } = user;
            return (
              <tbody>
                <tr>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.qualification}</td>
                  <td>{result.experience}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={()=>editId(result._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger "
                      onClick={() => deleteclickedFunction(result._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        )}
      </table>

      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Profile</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            {/* <div className="modal-body">{u_id}</div> */}
            <div className="container">
              <form method='POST' >
                <div className="row">
                  <div className="col-md-6">
                  <div className="form-outline">
                  <label htmlFor="name" className="form-label">Name</label>
                      <input type='text' className="form-control form-control-lg" required  name="name" onChange={handleInput}
                              value={user.name}/>
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-outline">
                  <label htmlFor="email" className="form-label">Email</label>
                      <input type='email' className="form-control form-control-lg"  required name='email' onChange={handleInput}
                              value={user.email}/>
                      </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                  <div className="form-outline">
                  <label htmlFor="phoneNo" className="form-label">PhoneNo</label>
                      <input type='tel'className="form-control form-control-lg"  name="phoneNo" onChange={handleInput}
                              value={user.phoneNo}/>
                      </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-outline">
                  <label htmlFor="qualification" className="form-label">Qualification</label>
                      <input type='text' className="form-control form-control-lg"  name='qualification' onChange={handleInput}
                              value={user.qualification}/>
                      </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                  <div className="form-outline">
                  <label htmlFor="password" className="form-label">Password</label>
                      <input type='password' className="form-control form-control-lg" name="password" onChange={handleInput}
                              value={user.password}/>
                      </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-outline">
                  <label htmlFor="cpassword" className="form-label">confirm Password</label>
                      <input type='password' className="form-control form-control-lg" name='cpassword' onChange={handleInput}
                              value={user.cpasssword}/>
                      </div>
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
              type="submit"
              className="btn btn-success"
              value='submit'
              onClick={postData}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>

            </div>
          </div>
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
    </>
  )
}

export default ViewLabTechnician
