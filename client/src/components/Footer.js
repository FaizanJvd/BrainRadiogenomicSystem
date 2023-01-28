import React from "react";
import logo from '../images/brain.png';
const Footer = () => {
  return (
    <>
      <footer
        id="sticky-footer"
        class="flex-shrink-0 py-4 bg-dark text-white-50"
      ><div className="container-fluid">

        <div className="row ms-4">
          <div className="col-6">
            <img src={logo} alt='..'></img>
            <h3>Brain Health Care</h3>
            <p>Health First,We Believe</p>
          </div>
          <div className="col-6 d-flex justify-content-end flex-column" style={{alignItems:'end'}}>
            <h3>Contact Us</h3>
            <h6>Email  : Faizanjvd54@gmail.com</h6>
            <h6>PhoneNO: +923326331315</h6>
          </div>
        </div>
      </div>
        <div class="container text-center">
          <small>Copyright &copy; Your Website</small>
        </div>
      </footer>
    </>
  );
};

export default Footer;
