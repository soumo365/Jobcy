import { Link, useParams } from "react-router-dom"
import { useJobs } from "../context/JobContext"
import { useAuth } from "../context/AuthContext"
import { db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

function JobDetails() {
  const { jobId } = useParams()
  const { jobs, loading } = useJobs()
  const { userData, loading: authLoading } = useAuth()

  // ✅ ALL HOOKS AT TOP
  const [job, setJob] = useState<any>(null)
  const [jobLoading, setJobLoading] = useState(true)
  const [employerProfilePic, setEmployerProfilePic] =
    useState<string | null>(null)

  /* ================= LOAD JOB ================= */

  useEffect(() => {
    if (!jobId) return

    const existingJob = jobs.find(j => j.id === jobId)

    if (existingJob) {
      setJob(existingJob)
      setJobLoading(false)
      return
    }

    const fetchJob = async () => {
      const snap = await getDoc(doc(db, "jobs", jobId))
      if (snap.exists()) {
        setJob({ id: snap.id, ...snap.data() })
      }
      setJobLoading(false)
    }

    fetchJob()
  }, [jobId, jobs])

  /* ================= EMPLOYER PROFILE PIC ================= */

  useEffect(() => {
    if (!job?.postedBy) return

    const fetchProfilePic = async () => {
      const snap = await getDoc(doc(db, "users", job.postedBy))
      if (snap.exists()) {
        setEmployerProfilePic(
          snap.data()?.profile?.profilePic || null
        )
      }
    }

    fetchProfilePic()
  }, [job?.postedBy])

  /* ================= SAFE RETURNS ================= */

  if (loading || authLoading || jobLoading)
    return <p>Loading job...</p>

  if (!job) return <p>Job not found</p>

  /* ================= LOGIC ================= */

  const isEmployer = userData?.role === "employer"
  const isLoggedIn = !!userData

  const applyLink = !isLoggedIn
    ? "/signup"
    : `/jobs/${job.id}/apply`

  /* ================= UI ================= */

  return (
    <section className="jobDetails">
      <div className="container">

        <div className="jobHeader">
          <div className="companyInfo">
            <img
              src={employerProfilePic || "https://via.placeholder.com/80"}
              alt={job.companyName}
            />

            <div>
              <h1>{job.title}</h1>
              <p className="company">
                {job.companyName} • {job.location?.city},{" "}
                {job.location?.country}
              </p>

              <div className="tags">
                <span>{job.employmentType}</span>
                <span>{job.experienceLevel}</span>
                <span>{job.location?.type}</span>
              </div>
            </div>
          </div>

          <Link
            to={applyLink}
            className={`applyBtn ${isEmployer ? "disabled" : ""}`}
          >
            Apply Now
          </Link>
        </div>

        <div className="jobLayout">
          <div className="jobContent">
            <div className="card">
              <h2>Job Description</h2>
              <p>{job.description}</p>
            </div>

            <div className="card">
              <h2>Required Skills</h2>
              <div className="skills">
                {job.skillsRequired?.map((skill: string, i: number) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="jobSidebar">
            <div className="sidebarCard">
              <h3>Job Overview</h3>
              <ul className="overviewList">
                {job.salary?.visible && (
                  <li>
                    <strong>Salary:</strong>{" "}
                    {job.salary.currency} {job.salary.min} –{" "}
                    {job.salary.max}
                  </li>
                )}
                <li><strong>Experience:</strong> {job.experienceLevel}</li>
                <li><strong>Location:</strong> {job.location?.city}</li>
                <li><strong>Job Type:</strong> {job.employmentType}</li>
              </ul>
            </div>

            <div className="sidebarCard">
              <h3>Company Information</h3>
              <p>{userData?.profile?.about || "No company info available"}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default JobDetails
