import { Link, Outlet } from "react-router-dom"


function CandidateProfile() {
  return (
    <>
  
      <section className="candidate-profile container">

  {/* PROFILE HEADER */}
  <div className="profile-header">
    <div className="profile-left">
      <div className="avatar">
        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" alt="Profile" />
      </div>

      <div>
        <h2>Priya Sharma</h2>
        <p className="role">Frontend Developer</p>
        <p className="location">Bangalore • India</p>
      </div>
    </div>

    <div className="profile-right">
      <Link to="/candidate-profile/edit-candidate-profile" className="edit-btn">Edit Profile</Link>
    </div>
  </div>

  {/* BASIC INFO */}
  <div className="profile-section">
    <h3>Basic Information</h3>

    <div className="info-grid">
      <div className="info-item">
        <span className="label">Email:</span>
        <p>priya.dev@gmail.com</p>
      </div>

      <div className="info-item">
        <span className="label">Phone:</span>
        <p>+91 9876543210</p>
      </div>

      <div className="info-item">
        <span className="label">Experience:</span>
        <p>3+ Years</p>
      </div>

      <div className="info-item">
        <span className="label">Education:</span>
        <p>B.Tech in Computer Science</p>
      </div>
    </div>
  </div>

  {/* SKILLS */}
  <div className="profile-section">
    <h3>Skills</h3>

    <div className="skills-box">
      <span>React</span>
      <span>JavaScript</span>
      <span>TypeScript</span>
      <span>UI/UX</span>
      <span>HTML & CSS</span>
      <span>Git</span>
      <span>Figma</span>
    </div>
  </div>

  {/* EXPERIENCE SECTION */}
  <div className="profile-section">
    <h3>Experience</h3>

    <div className="exp-card">
      <h4>Frontend Developer — Google</h4>
      <p className="duration">2022 - Present</p>
      <p className="desc">Building UI features with React, TypeScript, and Webpack. Created internal dashboards and optimized UI performance.</p>
    </div>

    <div className="exp-card">
      <h4>UI Developer — Infosys</h4>
      <p className="duration">2020 - 2022</p>
      <p className="desc">Worked on website redesigns, UI prototyping, and development using HTML, CSS, and JavaScript.</p>
    </div>
  </div>

  {/* RESUME SECTION */}
  <div className="profile-section resume-section">
    <h3>Resume</h3>

    <div className="resume-box">
      <p>Priya-Sharma-Resume.pdf</p>
      <button className="download-btn">Download</button>
    </div>
  </div>

</section>

    </>
  )
}

export default CandidateProfile