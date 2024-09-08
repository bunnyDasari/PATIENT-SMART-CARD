import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup";
import Card from "./card";
import PatientCard from "./patientDetails";
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/card" element={<Card />} />
        <Route path="/patient" element={<PatientCard />} />
      </Routes>
    </Router>
  );
}

export default App;
