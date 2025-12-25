import { Link, useParams } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function JobDetails() {
  const { jobId } = useParams();
  const { jobs, loading } = useJobs();
  const { userData } = useAuth();
  console.log(userData);
  if (loading) return <p>Loading job...</p>;

  const job = jobs.find(j => j.id === jobId);

  if (!job) return <p>Job not found</p>;
       
 const getEmployerProfilePic = async (uid:any) => {
  const snap = await getDoc(doc(db, "users", uid))
  if (snap.exists()) {
    return snap.data().profile.profilePic;
  }
  return null
}
const [employerProfilePic, setEmployerProfilePic] = useState<string | null>(null)
useEffect(() => {
  if (!job?.postedBy) return

  const fetchProfilePic = async () => {
    const pic = await getEmployerProfilePic(job.postedBy)
    setEmployerProfilePic(pic)
  }

  fetchProfilePic()
}, [job])



  return (
    <section className="jobDetails">
      <div className="container">

        {/* JOB HEADER */}
        <div className="jobHeader">
          <div className="companyInfo">
            <img
              src={ employerProfilePic || "https://via.placeholder.com/80"}
              alt={job.companyName}
            />
            <div>
              <h1>{job.title}</h1>
              <p className="company">
                {job.companyName} • {job.location.city}, {job.location.country}
              </p>

              <div className="tags">
                <span>{job.employmentType}</span>
                <span>{job.experienceLevel}</span>
                <span>{job.location.type}</span>
              </div>
            </div>
          </div>
         
          <Link to={`/jobs/${job.id}/apply`} className= {`applyBtn ${userData.role === "employer" 
            && "disabled" }`} >Apply Now</Link>
        </div>

        <div className="jobLayout">

          {/* LEFT CONTENT */}
          <div className="jobContent">

            <div className="card">
              <h2>Job Description</h2>
              <p>{job.description}</p>
            </div>

           

            <div className="card">
              <h2>Required Skills</h2>
              <div className="skills">
                {job.skillsRequired.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="jobSidebar">

            <div className="sidebarCard">
              <h3>Job Overview</h3>

              <ul className="overviewList">
                {job.salary.visible && (
                  <li>
                    <strong>Salary:</strong>{" "}
                    {job.salary.currency} {job.salary.min} – {job.salary.max}
                  </li>
                )}
                <li><strong>Experience:</strong> {job.experienceLevel}</li>
                <li><strong>Location:</strong> {job.location.city}</li>
                <li><strong>Job Type:</strong> {job.employmentType}</li>
                <li><strong>Applicants:</strong> 0</li>
                <li><strong>Views:</strong> 0</li>
              </ul>
            </div>

            <div className="sidebarCard">
              <h3>Company Information</h3>
              <p>{userData.profile.about}</p>
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
}

export default JobDetails;
