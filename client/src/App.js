import React from "react";
import Admin from './adminRoute/Admin';
import { Route, Routes } from "react-router-dom";
import AssignDoctorToPatient from "./receptionistRoutes/AssignDoctorToPatient";
import ReceptionistLogin from "./receptionistRoutes/ReceptionistLogin";
import ReceptionistRoutes from "./receptionistRoutes/ReceptionistRoutes"
import RegisterPatient from "./receptionistRoutes/RegisterPatient";
import SymptomsForm from "./receptionistRoutes/SymptomsForm";
import LandingPage from "./LandingPage";
import AdminLogIn from "./adminRoute/AdminLogIn";
import RegistrationPanel from "./adminRoute/RegistrationPanel";
import AdminHome from "./adminRoute/AdminHome";
import ViewPanel from "./adminRoute/ViewPanel";
import RegisterRadiologist from "./adminRoute/RegisterRadiologist";
import RegisterDoctor from "./adminRoute/RegisterDoctor";
import RegisterReceptionist from "./adminRoute/RegisterReceptionist";
import RegisterLabTechnician from "./adminRoute/RegisterLabTechnician";
import ViewDoctor from "./adminRoute/ViewDoctor";
import Flask from './adminRoute/Flask'
import ViewRadiologist from "./adminRoute/ViewRadiologist";
import ViewReceptionist from "./adminRoute/ViewReceptionist";
import ViewLabTechnician from "./adminRoute/ViewLabTechnician";
import PatientRoutes from "./patientRoutes/PatientRoutes";
import Profile from "./patientRoutes/Profile"
import Doctor from "./patientRoutes/Doctor"
import PatientLogin from './patientRoutes/Login'
import Chat from "./patientRoutes/Chat";
import Logout from "./patientRoutes/Logout";
import DoctorRoutes from "./doctorRoutes/DoctorRoutes";
import Patient from "./doctorRoutes/Patient";
import DoctorChat from "./doctorRoutes/DoctorChat";
import DoctorLogin from "./doctorRoutes/DoctorLogin";
import DoctorProfile from "./doctorRoutes/DoctorProfile";
import DoctorLogout from "./doctorRoutes/DoctorLogout";
import DocRXandREC from "./doctorRoutes/DocRXandREC";
import History from "./patientRoutes/History";
import RecepProfile from "./receptionistRoutes/RecepProfile";
import RecepLogout from "./receptionistRoutes/RecepLogout";
import DocForgetPassword from "./doctorRoutes/DocForgetPassword";
import Video from "./Video";
import RadiologistRoutes from "./radiologistRoutes/RadiologistRoutes";
import UploadScans from "./radiologistRoutes/UploadScans";
import AssignRadiologist from "./doctorRoutes/AssignRadiologist";
import RadiologistProfile from "./radiologistRoutes/RadiologistProfile";
import AssignedPatients from "./radiologistRoutes/AssignedPatients";
import RadiologistLogin from "./radiologistRoutes/RadiologistLogin";
import RadiologistLogout from "./radiologistRoutes/RadiologistLogout";
import GenerateReport from "./radiologistRoutes/GenerateReport";
import Report from "./components/Report";
import ImageViewer from "./components/ImageViewer";
import RadiologistViewSR from "./radiologistRoutes/RadiologistViewSR";
import ErrorPage from "./components/ErrorPage";
import DocViewScansAndReports from "./doctorRoutes/DocViewScansAndReports";
import AdminViewReports from "./adminRoute/AdminViewReports";
import ViewPatient from "./adminRoute/ViewPatient";
const App = () => {
  return (
    <>
    <Routes>
      {/* Logins */}
      <Route exact path="/" element={<LandingPage/>}/>
      <Route exact path="/adminLogin" element={<AdminLogIn/>} />
      <Route exact path="/receptionistLogin" element={<ReceptionistLogin />} />
      <Route exact path="/patientLogin" element = {<PatientLogin/>}/>
      <Route exact path="/doctorLogin" element = {<DoctorLogin/>}/>
      <Route exact path="/patientLogout" element={<Logout/>}/>
      <Route exact path="/doctorLogout" element={<DoctorLogout/>}/>
      <Route exact path="/receptionistLogout" element={<RecepLogout/>}/>
      <Route exact path="/docForgetPassword" element={<DocForgetPassword/>}/>
      <Route exact path="/radiologistLogin" element={<RadiologistLogin/>}/>
      <Route exact path="/radiologistLogout" element={<RadiologistLogout/>}/>
      

      {/* Admin Panel Routes */}
      <Route path = "/admin" element={<Admin/>}>
        <Route exact path="/admin/" element={<AdminHome/>}/>
        <Route  path="/admin/RegistrationPanel" element={<RegistrationPanel/>} />
        <Route  path="/admin/ViewPanel" element={<ViewPanel/>} />
        <Route exact path="/admin/RegisterDoctor" element={<RegisterDoctor />} />
        <Route exact path="/admin/RegisterRadiologist" element={<RegisterRadiologist />} />
        <Route exact path="/admin/RegisterReceptionist" element={<RegisterReceptionist />} />
        <Route exact path="/admin/RegisterLabTechnician" element={<RegisterLabTechnician />} />
        <Route exact path="/admin/ViewDoctor" element={<ViewDoctor />} />
        <Route exact path="/admin/ViewRadiologist" element={<ViewRadiologist />} />
        <Route exact path="/admin/ViewReceptionist" element={<ViewReceptionist/>} />
        <Route exact path="/admin/ViewPatient" element={<ViewPatient/>} />
        <Route exact path="/admin/ViewPatientsReported" element={<AdminViewReports/>} />
        <Route exact path="/admin/viewReport" element={<Report/>} />
        <Route exact path="/admin/test" element={<Flask/>} />
      </Route>


         {/* Receptionist panel Routes */}
      <Route exact path="/receptionistRoutes"  element={<ReceptionistRoutes/>}>
        <Route exact path="/receptionistRoutes/" element={<RecepProfile/>}/>
        <Route exact path="/receptionistRoutes/registerPatient" element={<RegisterPatient/>} />
        <Route exact path="/receptionistRoutes/symptoms" element={<SymptomsForm/>} />
        <Route exact path="/receptionistRoutes/assignDoctor" element={<AssignDoctorToPatient/>} />
      </Route>


      {/* Patient panel Routes */}
       <Route exact path='/patientRoutes' element={<PatientRoutes/>}>
        <Route exact path='/patientRoutes/' element={<Profile/>} />
        <Route exact path ='/patientRoutes/doctor' element={<Doctor/>}   />
        <Route exact path="/patientRoutes/chat"  element={<Chat/>} />
        <Route exact path="/patientRoutes/videoCall" element={<Video/>}/>
        <Route exact path="/patientRoutes/history"  element={<History/>} />
        <Route exact path="/patientRoutes/report" element={<Report/>} />
        <Route exact path="/patientRoutes/viewScans" element={<ImageViewer/>} />
       </Route>


      {/* Doctor Panel Routes */}

      <Route exact path="/doctorRoutes" element={<DoctorRoutes/>}>
        <Route exact path="/doctorRoutes/" element={<DoctorProfile/>} />
        <Route exact path="/doctorRoutes/patient" element={<Patient/>} />
        <Route exact path="/doctorRoutes/chat" element={<DoctorChat/>} />
        <Route exact path="/doctorRoutes/videoCall" element={<Video/>}/>
        <Route exact path="/doctorRoutes/viewScansAndReports" element={<DocViewScansAndReports/>} />
        <Route exact path="/doctorRoutes/rxAndRec" element={<DocRXandREC/>} />
        <Route exact path="/doctorRoutes/assignRadiologist" element={<AssignRadiologist/>}/>
        <Route exact path="/doctorRoutes/report" element={<Report/>} />
        <Route exact path="/doctorRoutes/viewScans" element={<ImageViewer/>} />
      </Route>


      {/* Radiologist Panel */}
      <Route exact path="/radiologistRoutes" element={<RadiologistRoutes/>}>
        <Route exact path="/radiologistRoutes/" element={<RadiologistProfile/>} />
        <Route exact path="/radiologistRoutes/patients" element={<AssignedPatients/>} />
        <Route exact path="/radiologistRoutes/uploadScans" element={<UploadScans/>} />
        <Route exact path="/radiologistRoutes/generateReport" element={<GenerateReport/>}/>
        <Route exact path="/radiologistRoutes/scansAndreport" element={<RadiologistViewSR/>}/>
        <Route exact path="/radiologistRoutes/report" element={<Report/>} />
        <Route exact path="/radiologistRoutes/viewScans" element={<ImageViewer/>} />
        <Route exact path="/radiologistRoutes/error" element={<ErrorPage/>} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
