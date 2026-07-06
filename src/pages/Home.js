import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <span className="tag">No. 1 Job Portal</span>
        <h1>
  Build Skills,  Unlock Jobs  <br />
  Shape Tomorrow. <span className="highlight">Forge Your Future</span>
</h1>
<p className="tagline">
  One career at a time <span className="highlight">CareerForge</span> empowers you to grow, connect, and thrive in today’s job market.
</p>
        {/* <p> */}
          Discover opportunities that match your skills and ambitions. 
          Connect with top companies and take your career to the next level.
        {/* </p> */}

        <div className="search-bar">
          <input type="text" placeholder="Find your dream jobs..." />
          <button>🔍</button>
        </div>

        <div className="categories">
          <button>Frontend Developer</button>
          <button>Backend Developer</button>
          <button>Data Engineer</button>
        </div>
      </div>

      <section className="jobs-section">
        <h2>
          Latest and Top <span className="highlight">Job Openings</span>
        </h2>
        <div className="job-cards">
          <div className="job-card">
            <h3>Google</h3>
            <p>Frontend Developer – React, TypeScript</p>
          </div>
          <div className="job-card">
            <h3>Microsoft India</h3>
            <p>Backend Engineer – Node.js, MongoDB</p>
          </div>
          <div className="job-card">
            <h3>JobHunt</h3>
            <p>Data Engineer – Python, SQL</p>
          </div>
        </div>
      </section>
    </div>
  );
}
