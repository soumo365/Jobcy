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
  status?: "in-review" | "shortlisted" | "rejected"
  createdAt?: any
}

type UserProfile = {
  profilePic?: string
  fullName?: string
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

      // 1️⃣ Fetch applications for this job
      const q = query(
        collection(db, "applications"),
        where("jobId", "==", jobId)
      )

      const snap = await getDocs(q)

      // 2️⃣ Join candidate profile
      const result: ApplicantWithProfile[] = await Promise.all(
        snap.docs.map(async appDoc => {
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
              profilePic: user?.profile?.profilePic || "",
              fullName: user?.profile?.fullName || "",
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
        <h1>Applicants</h1>

        {applicants.length === 0 && (
          <p>No applicants yet.</p>
        )}

        <div className="applicant-list">
          {applicants.map(app => {
            const status = app.status || "in-review"

            return (
              <div className="applicant-card" key={app.id}>
                <div className="applicant-left">
                  <img
                    src={
                      app.applicant?.profilePic ||
                      "/default-avatar.png"
                    }
                    alt="Applicant"
                  />

                  <div>
                    <h3>{app.applicant?.fullName}</h3>
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

                  {/* Future actions */}
                  {/* 
                  <button className="shortlist">Shortlist</button>
                  <button className="reject">Reject</button>
                  */}
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
