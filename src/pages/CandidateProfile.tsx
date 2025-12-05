import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


function CandidateProfile() {
const { userData, loading } = useAuth();

if (loading) return <p>Loading...</p>;
if (!userData) return <p>No user data found</p>;

const userDetails = userData.profile || {};


  return (
    <>
  
      <section className="candidate-profile container">

  {/* PROFILE HEADER */}
  <div className="profile-header">
    <div className="profile-left">
      <div className="avatar">
        <img src={userDetails.profilePic} />
      </div>

      <div>
        <h2>{userDetails.fullName}</h2>
        <p className="role">{userDetails.role}</p>
        <p className="location">{userDetails.location}</p>
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
        <p>{userDetails.email}</p>
      </div>

      <div className="info-item">
        <span className="label">Phone:</span>
        <p>{userDetails.phone}</p>
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
      {userDetails.skills.map((skill: string, index: number) => {
  return <span key={index}>{skill}</span>;
})}

    </div>
  </div>

  {/* EXPERIENCE SECTION */}
  <div className="profile-section">
    <h3>Experience</h3>


    {
  userDetails.experience.map((exp: any, index: number) => {
    return (
      <div className="exp-card" key={index}>
        <h4>{exp.jobTitle}</h4>
        <p className="duration">{exp.startYear} - {exp.endYear}</p>
        <p className="desc">{exp.description}</p>
      </div>
    );
  })
}


   
  </div>

  {/* RESUME SECTION */}
  <div className="profile-section resume-section">
    <h3>Resume</h3>

    <div className="resume-box">
      <p>{userDetails.resume.split("/").pop()}</p>
      <a 
  href={userDetails.resume} 
  download 
  target="_blank" 
  className="download-btn"
  rel="noopener noreferrer"
>
  Download
</a>
    </div>
  </div>

</section>

    </>
  )
}

export default CandidateProfile