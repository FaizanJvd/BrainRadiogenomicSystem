import React from "react";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import AccessibleIcon from '@mui/icons-material/Accessible';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FilterIcon from '@mui/icons-material/Filter';
const AdminHome = () => {
  return (
    <>
      <div className="container d-flex justify-content-center flex-wrap flex-row p-5 ">
        <div className="d-flex justify-content-around">
          <div
            className="card "
            style={{
              width: "18rem",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "1px 1px 0px 0px lightgray",
            }}
          >
            <div class="card-body">
              <div class="card-title">
                <GroupAddIcon style={{ fontSize: "50px", color: "#1e90ff" }} />
                <label
                  style={{
                    fontFamily: "revert",
                    fontSize: "30px",
                    fontWeight: "500",
                    marginLeft:"8px"
                  }}
                >
                  Doctor
                </label>
              </div>
              <p class="card-text fs-3">105</p>
            </div>
          </div>

          <div
            className="card ms-4"
            style={{
              width: "18rem",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "1px 1px 0px 0px lightgray",
            }}
          >
            <div class="card-body">
              <div class="card-title">
                <AccessibleIcon style={{ fontSize: "50px", color: "#1e90ff" }}/>
                <label
                  style={{
                    fontFamily: "revert",
                    fontSize: "30px",
                    fontWeight: "500",
                    marginLeft:"8px"
                  }}
                >
                  Patient
                </label>
              </div>
              <p class="card-text fs-3">2395</p>
            </div>
          </div>

          <div
            className="card ms-4"
            style={{
              width: "18rem",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "1px 1px 0px 0px lightgray",
            }}
          >
            <div class="card-body">
              <div class="card-title">
                <ManageAccountsIcon style={{ fontSize: "50px", color: "#1e90ff" }}/>
                <label
                  style={{
                    fontFamily: "revert",
                    fontSize: "30px",
                    fontWeight: "500",
                    marginLeft:"8px"
                  }}
                >
                  Radiologist
                </label>
              </div>
              <p class="card-text fs-3">215</p>
            </div>
          </div>
        </div>

        <div className="d-flex mt-4">
          <div
            className="card "
            style={{
              width: "18rem",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "1px 1px 0px 0px lightgray",
            }}
          >
            <div class="card-body">
              <div class="card-title">
                <RecordVoiceOverIcon style={{ fontSize: "50px", color: "#1e90ff" }}/>
                <label
                  style={{
                    fontFamily: "revert",
                    fontSize: "30px",
                    fontWeight: "500",
                    marginLeft:"8px"
                  }}
                >
                  Receptionist
                </label>
              </div>
              <p class="card-text fs-3">45</p>
            </div>
          </div>

          <div
            className="card ms-4"
            style={{
              width: "18rem",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "1px 1px 0px 0px lightgray",
            }}
          >
            <div class="card-body">
              <div class="card-title">
                <PostAddIcon style={{ fontSize: "50px", color: "#1e90ff" }}/>
                <label
                  style={{
                    fontFamily: "revert",
                    fontSize: "30px",
                    fontWeight: "500",
                    marginLeft:"8px"
                  }}
                >
                  Reports
                </label>
              </div>
              <p class="card-text fs-3">3325</p>
            </div>
            
          </div>

          <div
            className="card ms-4"
            style={{
              width: "18rem",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "1px 1px 0px 0px lightgray",
            }}
          >
            <div class="card-body">
              <div class="card-title">
                <FilterIcon style={{ fontSize: "50px", color: "#1e90ff" }}/>
                <label
                  style={{
                    fontFamily: "revert",
                    fontSize: "30px",
                    fontWeight: "500",
                    marginLeft:"8px"
                  }}
                >
                  Scans
                </label>
              </div>
              <p class="card-text fs-3">4025</p>
            </div>
            
          </div>
        </div>
      </div>

      <div className="d-flex">
 
      <div className="container w-50">
        <LineChart />
      </div>
      <div className="container w-25">
        <PieChart />
      </div>
      </div>
    </>
  );
};

export default AdminHome;
