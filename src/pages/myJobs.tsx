import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

/* ================= TYPES ================= */

type Application = {
  id: string
  jobId: string
  applicantUid: string
  status?: "in-review" | "shortlisted" | "rejected"
  createdAt?: any
}

type Job = {
  title: string
  company: string
  location?: {
    city?: string
    country?: string
  }
  postedBy: string
}

type UserProfile = {
  profilePic?: string
  fullName?: string
}

type ApplicationWithJob = Application & {
  job: Job | null
  employer: UserProfile | null
}

/* ================= COMPONENT ================= */

function MyJobs() {
  const { userData } = useAuth()

  const [applications, setApplications] =
    useState<ApplicationWithJob[]>([])
  const [loading, setLoading] = useState(true)
  const [filter] = useState("all")

  useEffect(() => {
    if (!userData?.uid) return

    const fetchAppliedJobs = async () => {
      setLoading(true)

      // 1️⃣ Fetch applications
      const q = query(
        collection(db, "applications"),
        where("applicantUid", "==", userData.uid)
      )

      const snap = await getDocs(q)

      // 2️⃣ Join jobs + employer profile
      const result: ApplicationWithJob[] = await Promise.all(
        snap.docs.map(async appDoc => {
          const appData = {
            id: appDoc.id,
            ...(appDoc.data() as Omit<Application, "id">),
          }

          // Job
          const jobSnap = await getDoc(
            doc(db, "jobs", appData.jobId)
          )

          const jobData = jobSnap.exists()
            ? (jobSnap.data() as Job)
            : null

          // Employer (users)
          let employerData: UserProfile | null = null

          if (jobData?.postedBy) {
            const userSnap = await getDoc(
              doc(db, "users", jobData.postedBy)
            )

            if (userSnap.exists()) {
              const user = userSnap.data()

              employerData = {
                profilePic: user?.profile?.profilePic || "",
                fullName: user?.profile?.fullName || "",
              }
            }
          }

          return {
            ...appData,
            job: jobData,
            employer: employerData,
          }
        })
      )

      setApplications(result)
      setLoading(false)
    }

    fetchAppliedJobs()
  }, [userData])

  /* ================= FILTER ================= */

  const filtered =
    filter === "all"
      ? applications
      : applications.filter(
          app => (app.status || "in-review") === filter
        )

  /* ================= UI ================= */

  if (loading) return <p>Loading applied jobs...</p>

  return (
    <section className="my-jobs-page">
      <div className="container">
        <h1>My Jobs</h1>

        {/* Example filter UI (optional) */}
        {/* 
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("in-review")}>In Review</button>
          <button onClick={() => setFilter("shortlisted")}>Shortlisted</button>
          <button onClick={() => setFilter("rejected")}>Rejected</button>
        </div>
        */}

        <div className="applied-jobs">
          {filtered.length === 0 && <p>No jobs found.</p>}

          {filtered.map(app => {
            const status = app.status || "in-review"

            return (
              <div className="applied-job-card" key={app.id}>
                <div className="job-left">
                  <img
                    src={
                      app.employer?.profilePic ||
                      "/default-avatar.png"
                    }
                    alt="Company"
                  />

                  <div>
                    <h3>{app.job?.title}</h3>
                    <p>
                      {app.job?.company} •{" "}
                      {app.job?.location?.city || "Remote"}
                    </p>
                  </div>
                </div>

                <div className="job-right">
                  <span className={`status ${status}`}>
                    {status.replace("-", " ")}
                  </span>

                  <span>
                    Applied on{" "}
                    {app.createdAt
                      ?.toDate?.()
                      .toLocaleDateString()}
                  </span>

                  <Link to={`/jobs/${app.jobId}`}>
                    View Job
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MyJobs
