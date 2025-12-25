import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore"
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase/config"

/* ================= TYPES ================= */

type Application = {
  id: string
  applicantUid: string
  jobId: string
  name?: string
  fullName?: string
  candidateName?: string
  status?: "in-review" | "shortlisted" | "rejected"
  createdAt?: any
}

type UserProfile = {
  profilePic?: string
  fullName?: string
  name?: string
  displayName?: string
}

type ApplicantWithProfile = Application & {
  applicant: UserProfile | null
}

/* ================= COMPONENT ================= */

function EmployerJobApplicants() {
  const { jobId } = useParams<{ jobId: string }>()

  const [applicants, setApplicants] =
    useState<ApplicantWithProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!jobId) return

    const fetchApplicants = async () => {
      setLoading(true)

      const q = query(
        collection(db, "applications"),
        where("jobId", "==", jobId)
      )

      const snap = await getDocs(q)

      const result: ApplicantWithProfile[] = await Promise.all(
        snap.docs.map(async (appDoc) => {
          const appData = {
            id: appDoc.id,
            ...(appDoc.data() as Omit<Application, "id">),
          }

          let applicantData: UserProfile | null = null

          const userSnap = await getDoc(
            doc(db, "users", appData.applicantUid)
          )

          if (userSnap.exists()) {
            const user = userSnap.data()

            applicantData = {
              profilePic:
                user?.profile?.profilePic ||
                user?.profilePic ||
                "/default-avatar.png",

              fullName:
                user?.profile?.fullName ||
                user?.fullName ||
                user?.name ||
                user?.displayName ||
                // 🔥 fallback from application
                appData.name ||
                appData.fullName ||
                appData.candidateName ||
                "Unnamed Candidate",
            }
          }

          return {
            ...appData,
            applicant: applicantData,
          }
        })
      )

      setApplicants(result)
      setLoading(false)
    }

    fetchApplicants()
  }, [jobId])

  /* ================= UI ================= */

  if (loading) return <p>Loading applicants...</p>

  return (
    <section className="employer-applicants">
      <div className="container">
        <Link to={`/employer-my-jobs`} className="back-btn">
          ← Back to all jobs
        </Link>

        <h1>Applicants</h1>

        {applicants.length === 0 && (
          <p>No applicants yet.</p>
        )}

        <div className="applicant-list">
          {applicants.map((app) => {
            const status = app.status || "in-review"

            return (
              <div className="applicant-card" key={app.id}>
                <div className="applicant-left">
                  <img
                    src={app.applicant?.profilePic}
                    alt="Applicant"
                  />

                  <div>
                    <h3>
                      {app.applicant?.fullName ||
                        app.name ||
                        app.fullName ||
                        app.candidateName ||
                        "Unnamed Candidate"}
                    </h3>

                    <p>
                      Applied on{" "}
                      {app.createdAt
                        ?.toDate?.()
                        .toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="applicant-right">
                  <span className={`status ${status}`}>
                    {status.replace("-", " ")}
                  </span>
                </div>

                <Link
                  to={`/employer-my-jobs/employer-job-applicants/${jobId}/${app.applicantUid}`}
                >
                  View Profile
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EmployerJobApplicants
