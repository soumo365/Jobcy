

function AboutPage() {
  return (
    <>
<section className="about-page">

  {/* HERO SECTION */}
  <div className="about-hero">
    <div className="container">
      <h1>About JobFinder</h1>
      <p>Your trusted platform to connect top talent with leading companies worldwide.</p>
    </div>
  </div>

  {/* OUR STORY */}
  <section className="our-story container">
    <div className="story-text">
      <h2>Our Story</h2>
      <p>
        JobFinder started with one simple mission — to make job searching faster, easier, 
        and more transparent. We believe everyone deserves access to opportunities that help 
        them grow and succeed in their career.
      </p>
      <p>
        Today, thousands of job seekers and companies trust our platform for reliable, verified 
        job listings and effortless hiring.
      </p>
    </div>

    <div className="story-img">
      <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216" alt="Our Story" />
    </div>
  </section>

  {/* STATS */}
  <section className="about-stats container">
    <div className="stat-card">
      <h3>10,000+</h3>
      <p>Active Jobs</p>
    </div>

    <div className="stat-card">
      <h3>2,500+</h3>
      <p>Companies Hiring</p>
    </div>

    <div className="stat-card">
      <h3>1M+</h3>
      <p>Applications Submitted</p>
    </div>

    <div className="stat-card">
      <h3>95%</h3>
      <p>User Satisfaction</p>
    </div>
  </section>

  {/* OUR VALUES */}
  <section className="our-values container">
    <h2>Our Values</h2>

    <div className="value-grid">
      <div className="value-card">
        <h3>Transparency</h3>
        <p>We verify every job to ensure authenticity and reliability.</p>
      </div>

      <div className="value-card">
        <h3>Innovation</h3>
        <p>We build smart tools that simplify hiring and job searching.</p>
      </div>

      <div className="value-card">
        <h3>Community</h3>
        <p>We empower people with opportunities to grow their careers.</p>
      </div>
    </div>
  </section>

  {/* TEAM SECTION */}
  <section className="team container">
    <h2>Meet Our Team</h2>

    <div className="team-grid">
      <div className="team-card">
        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe" alt="" />
        <h3>Rahul Sharma</h3>
        <p>CEO & Founder</p>
      </div>

      <div className="team-card">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="" />
        <h3>Priya Verma</h3>
        <p>Product Lead</p>
      </div>

      <div className="team-card">
        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" alt="" />
        <h3>Anjali Singh</h3>
        <p>UI/UX Designer</p>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="join-cta">
    <div className="container">
      <h2>Be part of our growing journey</h2>
      <a href="#" className="cta-btn">Join Us</a>
    </div>
  </section>

</section>


    </>
  );
}

export default AboutPage;
