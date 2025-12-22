import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore"
import { useParams, Link } from "react-router-dom"
import { db } from "../../firebase/config"

/* ================= TYPES ================= */

type Application = {
  id: string
  name?: string
  email?: string
  phone?: string
  location?: string
  coverLetter?: string
  resumeUrl?: string
  status?: "in-review" | "shortlisted" | "rejected"
  createdAt?: any
}

/* ================= COMPONENT ================= */

function ApplicantDetails() {
  const { applicantUid, jobId } = useParams<{
    applicantUid: string
    jobId: string
  }>()

  const [application, setApplication] =
    useState<Application | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!applicantUid || !jobId) return

    const fetchApplication = async () => {
      setLoading(true)

      const q = query(
        collection(db, "applications"),
        where("jobId", "==", jobId),
        where("applicantUid", "==", applicantUid)
      )

      const snap = await getDocs(q)

      if (!snap.empty) {
        const docSnap = snap.docs[0]
        setApplication({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Application, "id">),
        })
      }

      setLoading(false)
    }

    fetchApplication()
  }, [applicantUid, jobId])

  /* ================= STATUS UPDATE ================= */

  const updateStatus = async (
    status: "in-review" | "shortlisted" | "rejected"
  ) => {
    if (!application) return

    await updateDoc(
      doc(db, "applications", application.id),
      { status }
    )

    setApplication(prev =>
      prev ? { ...prev, status } : prev
    )
  }

  /* ================= UI ================= */

  if (loading) return <p>Loading applicant details...</p>
  if (!application) return <p>No application found.</p>

  const status = application.status || "in-review"

  return (
    <section className="applicant-details">
      <div className="container">
        <Link
          className="back-link"
          to={`/employer-my-jobs/employer-job-applicants/${jobId}`}
        >
          ← Back to Applicants
        </Link>

        {/* PROFILE CARD */}
        <div className="profile-card">
          <h2>{application.name}</h2>

          <span className={`status ${status}`}>
            {status.replace("-", " ")}
          </span>
        </div>

        {/* DETAILS */}
        <div className="details-card">
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone:</strong> {application.phone}</p>
          <p><strong>Location:</strong> {application.location}</p>

          {application.coverLetter && (
            <div className="cover-letter">
              <strong>Cover Letter</strong>
              <p>{application.coverLetter}</p>
            </div>
          )}

          {application.resumeUrl && (
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="resume-btn"
            >
              View Resume
            </a>
          )}

          <p className="applied-date">
            Applied on{" "}
            {application.createdAt
              ?.toDate?.()
              .toLocaleDateString()}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="actions">
          <button
            className="shortlist"
            disabled={status === "shortlisted"}
            onClick={() => updateStatus("shortlisted")}
          >
            Shortlist
          </button>

          <button
            className="reject"
            disabled={status === "rejected"}
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </button>

          <button
            className="review"
            disabled={status === "in-review"}
            onClick={() => updateStatus("in-review")}
          >
            In Review
          </button>
        </div>
      </div>
    </section>
  )
}

export default ApplicantDetails
