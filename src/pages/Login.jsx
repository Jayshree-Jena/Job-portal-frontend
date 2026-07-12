import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../sevices/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("candidate");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await login({
                email: formData.email,
                password: formData.password,
                role
            });

            const token = response.token || response.accessToken || response?.data?.token;
            const userName = response.user?.name || response.name || formData.email.split("@")[0];

            if (!token) {
                throw new Error("Authentication token not returned by backend.");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("name", userName);
            localStorage.setItem("role", role);

            alert(`Login Successful as ${role === 'recruiter' ? 'Recruiter' : 'Candidate'}`);
            navigate(role === "recruiter" ? "/recruiter" : "/candidate");
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p>Login to continue your CareerForge journey</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Login As</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            style={{ padding: '10px', borderRadius: '6px', background: '#13002b', color: '#fff', border: '1px solid rgba(168, 85, 247, 0.4)' }}
                        >
                            <option value="candidate">Candidate / Student</option>
                            <option value="recruiter">Recruiter / Company</option>
                        </select>
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

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && <div className="error-text">{error}</div>}

                <div className="bottom-text">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;