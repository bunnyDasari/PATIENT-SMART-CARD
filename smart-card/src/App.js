import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup";
import Card from "./card";
import PatientCard from "./patientDetails";
import ProtectedRoute from "./protect"; // Import your ProtectedRoute component
import Dashboard from "./dashboard";
import Home from "./Home";
import Features from "./features";
import Contact from "./contact";
import UploadDocument from "./documentUpload";
import Appointment from "./appoinment";
import Recoil from "./recoil";
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
      </Routes>

    </Router>
  );
}

export default App;
