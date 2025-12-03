

function Home() {

  return (
   <>
     
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <h1>
            Find Your <span>Dream Job</span><br /> In One Click
          </h1>
          <p>Search thousands of jobs from top global companies</p>

          <div className="search-box">
            <div className="input-group">
              <i className="ri-search-line"></i>
              <input type="text" placeholder="Job title, keywords..." />
            </div>

            <div className="input-group">
              <i className="ri-map-pin-line"></i>
              <input type="text" placeholder="Location" />
            </div>

            <button className="btn search-btn">
              <i className="ri-search-2-line"></i> Search
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories container">
        <h2>Popular Job Categories</h2>

        <div className="cat-grid">
          <div className="cat-card"><i className="ri-pencil-ruler-2-line"></i> Design</div>
          <div className="cat-card"><i className="ri-code-s-slash-fill"></i> Development</div>
          <div className="cat-card"><i className="ri-megaphone-line"></i> Marketing</div>
          <div className="cat-card"><i className="ri-shopping-cart-2-line"></i> Sales</div>
          <div className="cat-card"><i className="ri-user-3-line"></i> HR & Admin</div>
          {/* <div className="cat-card"><i className="ri-customer-service-2-line"></i> Customer Support</div> */}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="featured container">
        <h2>Featured Jobs</h2>

        <div className="job-list">
          <div className="job-card">
            <div className="job-top">
              <h3>Frontend Developer</h3>
              <span className="tag full">Full Time</span>
            </div>
            <p><i className="ri-building-line"></i> Google • Bangalore</p>
          </div>

          <div className="job-card">
            <div className="job-top">
              <h3>UI/UX Designer</h3>
              <span className="tag remote">Remote</span>
            </div>
            <p><i className="ri-building-line"></i> Tesla • Remote</p>
          </div>

          <div className="job-card">
            <div className="job-top">
              <h3>Software Engineer</h3>
              <span className="tag full">Full Time</span>
            </div>
            <p><i className="ri-building-line"></i> Microsoft • Hyderabad</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <div className="container">
          <h2>Why Choose JobCy?</h2>

          <div className="why-grid">
            <div className="why-card">
              <i className="ri-verified-badge-line"></i>
              <h3>10,000+ Verified Jobs</h3>
              <p>We manually verify every job for accurate information.</p>
            </div>

            <div className="why-card">
              <i className="ri-building-4-line"></i>
              <h3>Trusted by Top Companies</h3>
              <p>Used by global brands and fast-growing startups.</p>
            </div>

            <div className="why-card">
              <i className="ri-hand-heart-line"></i>
              <h3>Easy Application</h3>
              <p>Apply for your desired job in just one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Find Your Next Job?</h2>
          <a href="#" className="cta-btn">Create Free Account</a>
        </div>
      </section>

     
    </>
  )
}

export default Home;