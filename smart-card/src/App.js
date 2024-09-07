import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup";
import Card from "./card";
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/card" element={<Card />}/>
      </Routes>
    </Router>
  );
}

export default App;
