import { Link } from "react-router-dom"


function EmployerProfile() {
  return (
    <>
      <section className="employerProfilePage">
  <div className="container">

 
    <div className="profileTop">
      <div className="logoBox">
        <img src="https://via.placeholder.com/120" alt="Company Logo" />
      </div>

      <div className="companyInfo">
        <h1>FortMindz Technologies</h1>
        <p className="tagline">Innovating Future with Technology</p>

        <div className="infoGrid">
          <div className="infoItem">
            <span className="label">Industry</span>
            <p>IT & Software Development</p>
          </div>

          <div className="infoItem">
            <span className="label">Company Size</span>
            <p>50 - 200 Employees</p>
          </div>

          <div className="infoItem">
            <span className="label">Location</span>
            <p>Ahmedabad, Gujarat</p>
          </div>

          <div className="infoItem">
            <span className="label">Website</span>
            <p><a href="#">www.fortmindz.com</a></p>
          </div>
        </div>

        <Link to="/employer-profile/edit-employer-profile" className="editBtn">Edit Profile</Link>
      </div>
    </div>


    <div className="sectionBlock">
      <h2>About Company</h2>
      <p className="aboutText">
        FortMindz Technologies is a software development agency delivering
        high-performance digital solutions. We work with startups, enterprises,  
        and global brands to build modern applications that scale.
      </p>
    </div>


    <div className="sectionBlock">
      <h2>Why Work With Us</h2>

      <ul className="benefitsList">
        <li>Flexible Working Hours</li>
        <li>5 Days Working</li>
        <li>Hybrid/Remote Options</li>
        <li>Rapid Growth Opportunities</li>
      </ul>
    </div>

    
    <div className="sectionBlock">
      <h2>Open Positions</h2>

      <div className="jobCardList">

        <div className="jobCard">
          <h3>Frontend Developer</h3>
          <p className="meta">Ahmedabad — Full Time</p>
          <p className="desc">
            Looking for a React.js developer with 1–3 years experience.
          </p>
          <button className="viewBtn">View Details</button>
        </div>

        <div className="jobCard">
          <h3>UI/UX Designer</h3>
          <p className="meta">Remote — Contract</p>
          <p className="desc">
            Creative designer who can build modern dashboards & mobile UI.
          </p>
          <button className="viewBtn">View Details</button>
        </div>

      </div>
    </div>
  </div>
</section>

   </>
  )
}

export default EmployerProfile