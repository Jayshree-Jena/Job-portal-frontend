import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Details:", formData);
        
        // Backend authentication will be added later
        alert("Login Successful");
        navigate("/candidate");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p>Login to continue your CareerForge journey</p>

                <form onSubmit={handleSubmit}>
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
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                            <button 
                                type="button" 
                                className="show-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <div className="bottom-text">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;