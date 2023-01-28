import React from "react";
import "./ServicePage.css";
const LandingServeices = () => {
  return (
    <>
      <div className="mt-4">
        <div class="Ssection-title">
          <h2>Services</h2>
          <h3>
            Check our <label style={{fontSize:"30px",color: '#106eea',display:"block"}}>Services</label>
          </h3>
          <p>
            Our Service meet the standard of modern health care system by
            facilitating entir patient and hospital crew in single platform.
          </p>
        </div>
      </div>


      <div className="container ">
        <div class="row ms-5 mb-3 services">

          <div class="col-4 mt-2" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon">
                <i class="bi bi-activity"></i>
              </div>
              <h4>
                Automated CheckUp
              </h4>
              <p>
                patient can chat with doctor and get automated way after get assigned through our system.
              </p>
            </div>
          </div>

          <div class="col-4 mt-2" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon">
                <i class="bi bi-file-earmark-medical-fill"></i>
              </div>
              <h4>
                Reporting
              </h4>
              <p>
                patient can get their reports in their dashboard and can download it.
              </p>
            </div>
          </div>
          
          <div class="col-4 mt-2" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon">
                <i class="bi bi-person-check-fill"></i>
              </div>
              <h4>
                Personal Account
              </h4>
              <p>
                patient get their personal account and can get their reports and can chat with doctor.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LandingServeices;
