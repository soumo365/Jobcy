import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

function ApplicationSuccess() {
  const { jobId } = useParams()
  const [job, setJob] = useState<any>(null)
  const [appliedDate, setAppliedDate] = useState<string>("")

  // 🔹 Fetch job details
  useEffect(() => {
    if (!jobId) return

    const fetchJob = async () => {
      const snap = await getDoc(doc(db, "jobs", jobId))
      if (snap.exists()) {
        setJob({ id: snap.id, ...snap.data() })
      }
    }

    fetchJob()

    // store applied date (client-side is fine here)
    setAppliedDate(new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }))
  }, [jobId])

  // 🔹 Format location safely
  const formatLocation = (location: any) => {
    if (!location) return ""
    const { city, country } = location
    return [city, country].filter(Boolean).join(", ")
  }

  // 🔹 Guard render
  if (!job) return <p>Loading...</p>

  return (
    <section className="application-success">
      <div className="success-card">

        {/* ICON */}
        <div className="success-icon">✓</div>

        {/* CONTENT */}
        <h1>Application Submitted Successfully!</h1>

        <p>
          Your application for{" "}
          <strong>{job.title}</strong> at{" "}
          <strong>{job.company}</strong> has been sent.
        </p>

        <div className="job-brief">
          <span>
            {formatLocation(job.location)} • {job.type}
          </span>
          <span>Applied on: {appliedDate}</span>
        </div>

        {/* ACTIONS */}
        <div className="success-actions">
          <Link to="/jobs" className="btn-primary">
            Back to Jobs
          </Link>

          <Link to="/applied-jobs" className="btn-secondary">
            View Applied Jobs
          </Link>
        </div>

        {/* NOTE */}
        <div className="success-note">
          <p>
            Employers usually respond within 3–7 working days.
            Make sure your profile is up to date.
          </p>
        </div>

      </div>
    </section>
  )
}

export default ApplicationSuccess
