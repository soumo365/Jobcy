


const JobPage = () => {
  

  return (
   <section className="job-listing-page container">

  {/* PAGE TITLE */}
  <div className="page-header">
    <h1>Find Your Perfect Job</h1>
    <p>Explore thousands of job opportunities curated for you</p>
  </div>

  {/* FILTER BAR */}
  <div className="filter-bar">
    <input type="text" placeholder="Search job title..." />
    <select>
      <option>All Categories</option>
      <option>Design</option>
      <option>Development</option>
      <option>Marketing</option>
      <option>Sales</option>
      <option>HR & Admin</option>
    </select>

    <select>
      <option>Location</option>
      <option>Bangalore</option>
      <option>Hyderabad</option>
      <option>Mumbai</option>
      <option>Delhi</option>
      <option>Remote</option>
    </select>

    <select>
      <option>Job Type</option>
      <option>Full Time</option>
      <option>Part Time</option>
      <option>Internship</option>
      <option>Contract</option>
    </select>

    <button className="filter-btn">Search</button>
  </div>

  {/* JOB LIST GRID */}
  <div className="job-list-grid">

    <div className="job-card">
      <div className="top">
        <h3>Senior Frontend Developer</h3>
        <span className="tag full">Full Time</span>
      </div>
      <p className="company">Google • Bangalore</p>
      <p className="desc">Build world-class UI using React, TypeScript & modern tooling.</p>

      <div className="job-meta">
        <span>₹20L - ₹35L</span>
        <span>5+ Years Exp</span>
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>

    <div className="job-card">
      <div className="top">
        <h3>UI/UX Designer</h3>
        <span className="tag remote">Remote</span>
      </div>
      <p className="company">Airbnb • Remote</p>
      <p className="desc">Create user-focused design systems and interactive prototypes.</p>

      <div className="job-meta">
        <span>₹12L - ₹20L</span>
        <span>3+ Years Exp</span>
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>

    <div className="job-card">
      <div className="top">
        <h3>Backend Engineer</h3>
        <span className="tag hybrid">Hybrid</span>
      </div>
      <p className="company">Microsoft • Hyderabad</p>
      <p className="desc">Build scalable backend systems using Node.js & cloud tools.</p>

      <div className="job-meta">
        <span>₹15L - ₹28L</span>
        <span>4+ Years Exp</span>
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>

  </div>

</section>

  );
};

export default JobPage;
