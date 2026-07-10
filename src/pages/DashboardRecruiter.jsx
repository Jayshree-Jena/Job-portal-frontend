import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardRecruiter = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState('');

    const mockJobId = "65c3b1a2e4b0c123456789ab"; 

    useEffect(() => {
        const fetchApplicants = async () => {
            if (!selectedJobId) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/matching/job/${selectedJobId}/applicants`);
                setApplicants(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching AI shortlists:", error);
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [selectedJobId]);

    return (
        <div style={{ backgroundColor: '#0b001a', color: '#fff', minHeight: '100vh', padding: '2.5rem', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '2.2rem', margin: '0 0 0.5rem 0', textShadow: '0 0 10px rgba(147, 51, 234, 0.5)' }}>
                AI-Powered <span style={{ color: '#a855f7' }}>Recruiter Dashboard</span>
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2.5rem' }}>Select an open job post to review real-time semantic applicant tracking matches.</p>

            <button 
                onClick={() => setSelectedJobId(mockJobId)} 
                style={{ background: 'linear-gradient(45deg, #a855f7, #ec4899)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '2.5rem', boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}
            >
                ⚡ Fetch Ranked Applicant List
            </button>

            {loading && <div style={{ color: '#a855f7', fontSize: '1.1rem', marginBottom: '1rem' }}>Analyzing Resumes with AI pipeline...</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                {applicants.map((candidate) => (
                    <div 
                        key={candidate.applicationId} 
                        style={{ background: 'rgba(25, 10, 50, 0.6)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                    >
                        <div>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{candidate.candidateName}</h3>
                            <p style={{ color: '#cbd5e1', margin: '0 0 1rem 0', fontSize: '0.95rem' }}>{candidate.email}</p>
                            <a href={`http://localhost:5000/${candidate.resumePath}`} target="_blank" rel="noreferrer" style={{ color: '#ec4899', fontWeight: 'bold', textDecoration: 'none' }}>View Resume PDF</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '65px', height: '65px', borderRadius: '50%', background: '#1e1b4b', color: candidate.matchScore >= 75 ? '#22c55e' : '#a855f7', border: candidate.matchScore >= 75 ? '2px solid #22c55e' : '2px solid #a855f7', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 10px rgba(168,85,247,0.2)' }}>
                            {candidate.matchScore}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardRecruiter;