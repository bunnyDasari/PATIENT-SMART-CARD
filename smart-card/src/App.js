import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup";
import Card from "./card";
import PatientCard from "./patientDetails";
import ProtectedRoute from "./protect"; // Import your ProtectedRoute component
import Cookies from 'js-cookie';
const checkLogin = Cookies.get("jwt_token")

function App() {
  return (
    <Router>
      <Routes>
        {checkLogin === undefined ? <Route path="/" element={<Login />} /> : <Route path="/card" element={<Card />} />}

        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/card" element={<Card />} />
          <Route path="/patient" element={<PatientCard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
