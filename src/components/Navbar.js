import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* <h1 className="logo">JobPortal</h1> */}
      <h1 className="logo">
  Career<span>Forge</span>
</h1>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

