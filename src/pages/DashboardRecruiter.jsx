import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRecruiterJobs, postJob } from "../sevices/api";
import "./Dashboard.css";

const DashboardRecruiter = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    qualifications: "",
    location: "",
    jobType: "",
    vacancies: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const recruiterName = localStorage.getItem("name");
  const mockJobId = "65c3b1a2e4b0c123456789ab"; // replace with real jobId

  const fetchJobs = async () => {
    try {
      setError("");
      const data = await getRecruiterJobs();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching recruiter jobs:", err);
      setError("Unable to load posted jobs. Please login again or check your token.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch AI-ranked applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      if (!selectedJobId) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5001/api/matching/job/${selectedJobId}/applicants`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching AI shortlists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [selectedJobId]);

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    const payload = {
      title: jobForm.title,
      description: jobForm.description,
      qualifications: jobForm.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter(Boolean),
      location: jobForm.location,
      jobType: jobForm.jobType,
      vacancies: jobForm.vacancies
    };

    try {
      await postJob(payload);
      setSuccessMessage("Job posted successfully.");
      setJobForm({
        title: "",
        description: "",
        qualifications: "",
        location: "",
        jobType: "",
        vacancies: ""
      });
      fetchJobs();
    } catch (err) {
      console.error("Error posting job:", err);
      setError("Unable to post job. Please check your network or token.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome banner */}
      <div className="dashboard-header">
        <h1>Welcome, {recruiterName} 👋</h1>
        <p>Manage your job postings and review AI-powered applicant matches.</p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>{jobs.length}</h3>
          <p>Jobs Posted</p>
        </div>
      </div>

      {/* Job posting form */}
      <div className="jobs-section">
        <h2>Post a New Job</h2>
        {error && <p className="error-text">{error}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}

        <form className="job-form" onSubmit={handleJobSubmit}>
          <div className="form-row">
            <label>Title</label>
            <input
              name="title"
              value={jobForm.title}
              onChange={handleJobChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Description</label>
            <textarea
              name="description"
              value={jobForm.description}
              onChange={handleJobChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Qualifications (comma separated)</label>
            <input
              name="qualifications"
              value={jobForm.qualifications}
              onChange={handleJobChange}
            />
          </div>
          <div className="form-row">
            <label>Location</label>
            <input
              name="location"
              value={jobForm.location}
              onChange={handleJobChange}
            />
          </div>
          <div className="form-row">
            <label>Job Type</label>
            <input
              name="jobType"
              value={jobForm.jobType}
              onChange={handleJobChange}
            />
          </div>
          <div className="form-row">
            <label>Vacancies</label>
            <input
              name="vacancies"
              type="number"
              min="1"
              value={jobForm.vacancies}
              onChange={handleJobChange}
            />
          </div>
          <button type="submit" className="submit-job-btn">
            Post Job
          </button>
        </form>
      </div>

      {/* Job postings */}
      <div className="jobs-section">
        <h2>Your Job Postings</h2>
        <div className="jobs-grid">
          {jobs.length === 0 ? (
            <div className="empty-state">No posted jobs yet.</div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="job-card"
                onClick={() => setSelectedJobId(job._id)}
                style={{ cursor: "pointer" }}
              >
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p>Qualifications: {job.qualifications?.join(", ")}</p>
                <p>{job.location || "Location not specified"}</p>
                <p>{job.jobType || "Job type not specified"}</p>
                <p>Vacancies: {job.vacancies || "N/A"}</p>
                <p>Posted At: {new Date(job.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AI-powered ranking */}
      <div className="applicants-section">
        <h2>AI-Powered Applicant Ranking</h2>

        <button
          onClick={() => setSelectedJobId(mockJobId)}
          style={{
            background: "linear-gradient(45deg, #a855f7, #ec4899)",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "2.5rem",
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
          }}
        >
          ⚡ Fetch Ranked Applicant List
        </button>

        {loading && (
          <div style={{ color: "#a855f7", fontSize: "1.1rem", marginBottom: "1rem" }}>
            Analyzing Resumes with AI pipeline...
          </div>
        )}

        <div className="applicants-grid">
          {applicants.map((candidate) => (
            <div key={candidate.applicationId} className="applicant-card">
              <div>
                <h3>{candidate.candidateName}</h3>
                <p>{candidate.email}</p>
                <a
                  href={`http://localhost:5001/${candidate.resumePath}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#ec4899",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  View Resume PDF
                </a>
              </div>
              <div
                className="match-score"
                style={{
                  color: candidate.matchScore >= 75 ? "#22c55e" : "#a855f7",
                  border: candidate.matchScore >= 75
                    ? "2px solid #22c55e"
                    : "2px solid #a855f7",
                }}
              >
                {candidate.matchScore}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardRecruiter;
