import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useJobs } from "../../context/JobContext";

function EmployerProfile() {
  const { userData, loading: authLoading } = useAuth();
  const { myJobs, loading: jobsLoading } = useJobs();

  // Auth loading
  if (authLoading) return <p>Loading profile...</p>;

  if (!userData || !userData.profile) {
    return <p>No profile data</p>;
  }

  const profile = userData.profile;

  return (
    <section className="employerProfilePage">
      <div className="container">

        {/* TOP PROFILE */}
        <div className="profileTop">
          <div className="logoBox">
            <img
              src={profile.profilePic || "https://via.placeholder.com/120"}
              alt="Company Logo"
            />
          </div>

          <div className="companyInfo">
            <h1>{profile.companyName}</h1>
            <p className="tagline">{profile.tagline}</p>

            <div className="infoGrid">
              <div className="infoItem">
                <span className="label">Industry</span>
                <p>{profile.industry}</p>
              </div>

              <div className="infoItem">
                <span className="label">Company Size</span>
                <p>{profile.companySize}</p>
              </div>

              <div className="infoItem">
                <span className="label">Location</span>
                <p>{profile.location}</p>
              </div>

              <div className="infoItem">
                <span className="label">Website</span>
                <p>
                  <a href={profile.website} target="_blank" rel="noreferrer">
                    {profile.website}
                  </a>
                </p>
              </div>
            </div>

            <Link
              to="/employer-profile/edit-employer-profile"
              className="editBtn"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* ABOUT */}
        <div className="sectionBlock">
          <h2>About Company</h2>
          <p className="aboutText">{profile.about}</p>
        </div>

        {/* BENEFITS */}
        <div className="sectionBlock">
          <h2>Why Work With Us</h2>
          <ul className="benefitsList">
            {profile.benefits?.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* JOBS */}
        <div className="sectionBlock">
          <h2>Open Positions</h2>

          <div className="jobCardList">
            {jobsLoading && <p>Loading jobs...</p>}

            {!jobsLoading && myJobs.length === 0 && (
              <p>No jobs posted yet</p>
            )}

            {!jobsLoading &&
              myJobs.map((job) => (
                <div className="jobCard" key={job.id}>
                  <h3>{job.title}</h3>

                  <p className="meta">
                    {job.location.city} — {job.employmentType}
                  </p>

                  <p className="desc">{job.description}</p>

                  <button className="viewBtn">View Details</button>
                </div>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default EmployerProfile;
