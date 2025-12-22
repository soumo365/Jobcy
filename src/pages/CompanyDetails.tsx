import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { db } from "../firebase/config"

/* ================= TYPES ================= */

type Company = {
  id: string
  companyName: string
  profilePic: string
  location?: string | { city?: string; country?: string; type?: string }
  about: string
}

type Job = {
  id: string
  title: string
  location?: string | { city?: string; country?: string; type?: string }
  createdAt?: any
}

/* ================= COMPONENT ================= */

function CompanyDetails() {
  const { companyId } = useParams<{ companyId: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!companyId) return

    const fetchCompanyDetails = async () => {
      setLoading(true)

      // 1️⃣ Fetch company profile
      const userSnap = await getDoc(doc(db, "users", companyId))
      if (userSnap.exists()) {
        const data = userSnap.data()
        const profile = data?.profile || {}

        setCompany({
          id: userSnap.id,
          companyName: profile.companyName || "Unknown Company",
          profilePic: profile.profilePic || "/company-placeholder.png",
          location: profile.location,
          about: profile.about || "",
        })
      }

      // 2️⃣ Fetch jobs posted by this company
      const q = query(collection(db, "jobs"), where("postedBy", "==", companyId))
      const snap = await getDocs(q)

      const jobList: Job[] = snap.docs.map(docSnap => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          title: data.title,
          location: data.location,
          createdAt: data.createdAt,
        }
      })

      setJobs(jobList)
      setLoading(false)
    }

    fetchCompanyDetails()
  }, [companyId])

  /* ================= HELPERS ================= */

  const renderLocation = (loc?: string | { city?: string; country?: string }) => {
    if (!loc) return "Remote"

    if (typeof loc === "string") return loc

    const parts = []
    if (loc.city) parts.push(loc.city)
    if (loc.country) parts.push(loc.country)

    return parts.join(", ") || "Remote"
  }

  /* ================= UI ================= */

  if (loading) return <p>Loading company details...</p>
  if (!company) return <p>Company not found.</p>

  return (
    <section className="company-details-page">
      <div className="container">
        <Link to="/companies" className="back-link">← Back to Companies</Link>

        {/* COMPANY PROFILE */}
        <div className="company-profile">
          <img src={company.profilePic} alt={company.companyName} />
          <h2>{company.companyName}</h2>
          <p className="location">{renderLocation(company.location)}</p>
          {company.about && <p className="about">{company.about}</p>}
        </div>

        {/* OPEN JOBS */}
        <div className="company-jobs">
          <h3>Open Jobs ({jobs.length})</h3>

          {jobs.length === 0 && <p>No jobs posted yet.</p>}

          <div className="job-list">
            {jobs.map(job => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="job-card"
              >
                <h4>{job.title}</h4>
                <p>{renderLocation(job.location)}</p>
                {job.createdAt && (
                  <span className="posted-date">
                    {job.createdAt?.toDate?.().toLocaleDateString()}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyDetails
