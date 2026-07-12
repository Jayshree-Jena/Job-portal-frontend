// src/api.js
import axios from "axios";

const API_URL = "http://localhost:5001/api";

// Login user
export const login = async ({ email, password, role }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
      role
    });
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
        role
      });
      return res.data;
    }
    throw err;
  }
};

// Get recruiter’s jobs
export const getRecruiterJobs = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/jobs/mine`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Post a new job
export const postJob = async (jobData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/jobs`, jobData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
