import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { db } from "../../firebase/config"

/* ================= TYPES ================= */

type Job = {
  id: string
  title: string
  company: string
  location?: {
    city?: string
    country?: string
  }
  postedBy: string
  createdAt?: any
}

type JobWithStats = Job & {
  applicantsCount: number
}

/* ================= COMPONENT ================= */

function EmployerMyJobs() {
  const { userData } = useAuth()

  const [jobs, setJobs] = useState<JobWithStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userData?.uid) return

    const fetchEmployerJobs = async () => {
      setLoading(true)

      // 1️⃣ Fetch employer jobs
      const jobsQuery = query(
        collection(db, "jobs"),
        where("postedBy", "==", userData.uid)
      )

      const jobsSnap = await getDocs(jobsQuery)

      // 2️⃣ For each job → count applications
      const result: JobWithStats[] = await Promise.all(
        jobsSnap.docs.map(async jobDoc => {
          const jobData = {
            id: jobDoc.id,
            ...(jobDoc.data() as Omit<Job, "id">),
          }

          const appsQuery = query(
            collection(db, "applications"),
            where("jobId", "==", jobDoc.id)
          )

          const appsSnap = await getDocs(appsQuery)

          return {
            ...jobData,
            applicantsCount: appsSnap.size,
          }
        })
      )

      setJobs(result)
      setLoading(false)
    }

    fetchEmployerJobs()
  }, [userData])

  /* ================= UI ================= */

  if (loading) return <p>Loading your jobs...</p>

  return (
    <section className="employer-my-jobs">
      <div className="container">
        <h1>My Posted Jobs</h1>

        {jobs.length === 0 && (
          <p>You haven’t posted any jobs yet.</p>
        )}

        <div className="job-list">
          {jobs.map(job => (
            <div className="applicants-job-card" key={job.id}>
              <div className="job-left">
                <h3>{job.title}</h3>
                <p>
                  {job.company} •{" "}
                  {job.location?.city || "Remote"}
                </p>
              </div>

              <div className="job-right">
                <span className="app-count">
                  {job.applicantsCount} Applicants
                </span>

            <Link to={`/employer-my-jobs/employer-job-applicants/${job.id}`}>
  View Applications
</Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmployerMyJobs
