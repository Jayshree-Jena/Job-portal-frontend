import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardCandidate from "./pages/DashboardCandidate";
import DashboardRecruiter from "./pages/DashboardRecruiter";
import JobListings from "./pages/JobListings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/candidate" element={<DashboardCandidate />} />
        <Route path="/recruiter" element={<DashboardRecruiter />} />
        <Route path="/jobs" element={<JobListings />} />
      </Routes>
    </Router>
  );
}

export default App;
