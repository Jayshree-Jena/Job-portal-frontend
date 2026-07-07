import { useState } from "react";
import "./JobListings.css";

function JobListings() {
    // Mock data for jobs matching your homepage theme
    const [jobs] = useState([
        {
            id: 1,
            title: "Frontend Developer",
            company: "Google",
            location: "Bangalore, India",
            type: "Full-time",
            salary: "₹18,00000 - ₹24,00000 / year",
            posted: "1 day ago"
        },
        {
            id: 2,
            title: "Backend Developer",
            company: "Microsoft India",
            location: "Hyderabad, India",
            type: "Full-time",
            salary: "₹20,00000 - ₹28,00000 / year",
            posted: "2 days ago"
        },
        {
            id: 3,
            title: "Data Engineer",
            company: "JobHunt",
            location: "Remote",
            type: "Contract",
            salary: "₹12,00000 - ₹16,00000 / year",
            posted: "Just now"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Filter jobs based on user input
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="jobs-container">
            <header className="jobs-header">
                <h1>Find Your Dream <span className="highlight">Job</span></h1>
                <p>Discover opportunities that match your skills and ambitions.</p>
                
                <div className="search-bar-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by job title or company..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <main className="jobs-grid">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                            <div className="job-card-header">
                                <span className="job-type">{job.type}</span>
                                <span className="job-date">{job.posted}</span>
                            </div>
                            <h2>{job.title}</h2>
                            <h3>{job.company}</h3>
                            <p className="job-location">📍 {job.location}</p>
                            <p className="job-salary">{job.salary}</p>
                            <button className="apply-btn">Apply Now</button>
                        </div>
                    ))
                ) : (
                    <p className="no-jobs">No jobs found matching "{searchTerm}"</p>
                )}
            </main>
        </div>
    );
}

export default JobListings;