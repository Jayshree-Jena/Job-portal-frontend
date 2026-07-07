import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Imports directly from the same pages folder

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Signup Details:", formData);

        // Backend registration will be added later
        alert("Account Created Successfully");
        navigate("/login");
    };

    return (
        <div className="login-container"> {/* Reusing container classes for matching layouts */}
            <div className="login-card">
                <h1>Create Account</h1>
                <p>Join CareerForge and build your professional path</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input 
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input 
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="password-box">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <div className="password-box">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <button 
                            type="button" 
                            className="show-btn"
                            style={{ marginTop: "10px", alignSelf: "flex-end" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide Passwords" : "Show Passwords"}
                        </button>
                    </div>

                    <button type="submit" className="login-btn">
                        Sign Up
                    </button>
                </form>

                <div className="bottom-text">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
