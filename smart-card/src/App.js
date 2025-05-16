import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup";
import Card from "./card";
import PatientCard from "./patientDetails";
import ProtectedRoute from "./protect";
import Dashboard from "./dashboard";
import Home from "./Home";
import Features from "./features";
import Contact from "./contact";
import UploadDocument from "./documentUpload";
import Appointment from "./appoinment";
import Recoil from "./recoil";
import Admin from "./admin";
import AdminLogin from "./adminLogin";
import AdminSignup from "./adminsignup";
import Askai from "./askAI";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/fea" element={<Features />} />
        <Route path="/con" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/card" element={<Card />} />
        </Route>
        <Route path="/patient" element={<PatientCard />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/apoi" element={<Appointment />} />
        <Route path="/r" element={<Recoil />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/r" element={<Recoil />} />
        <Route path="/askai" element={<Askai />} />
      </Routes>
    </Router>
  );
}

export default App;
