import React, { useState } from 'react';
import axios from 'axios';

const DashboardCandidate = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a PDF file first.");
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobId', '65c3b1a2e4b0c123456789ab'); // Mock Job ID for pipeline testing
        formData.append('candidateId', 'candidate123');

        setUploading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/applications/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage("🎉 Resume uploaded & application tracked successfully!");
            setUploading(false);
        } catch (error) {
            console.error(error);
            setMessage("Error uploading resume. Check backend connection.");
            setUploading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#0b001a', color: '#fff', minHeight: '100vh', padding: '2.5rem', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '2.2rem', margin: '0 0 0.5rem 0', textShadow: '0 0 10px rgba(236, 72, 153, 0.4)' }}>
                Student <span style={{ color: '#ec4899' }}>Workspace</span>
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2.5rem' }}>Upload your latest resume to parse keywords and calculate system match eligibility profiles.</p>

            {/* Upload Box Card Container */}
            <div style={{ background: 'rgba(25, 10, 50, 0.6)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '16px', padding: '2rem', maxWidth: '600px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                <h3 style={{ marginTop: '0', color: '#cbd5e1' }}>Submit Your Resume</h3>
                <form onSubmit={handleUploadSubmit}>
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange} 
                        style={{ display: 'block', margin: '1.5rem 0', color: '#94a3b8' }} 
                    />
                    <button 
                        type="submit" 
                        disabled={uploading}
                        style={{ background: 'linear-gradient(45deg, #ec4899, #a855f7)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)' }}
                    >
                        {uploading ? "Parsing Document AI..." : "🚀 Submit Application"}
                    </button>
                </form>
                {message && <p style={{ marginTop: '1.5rem', color: '#a855f7', fontWeight: '600' }}>{message}</p>}
            </div>
        </div>
    );
};

export default DashboardCandidate;