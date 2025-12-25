import { useEffect, useState } from "react"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"

/* ================= TYPES ================= */

type Job = {
  id: string
  title: string
  company: string
  location?: string | { city?: string; country?: string }
  type?: "Full Time" | "Part Time" | "Remote"
}

/* ================= COMPONENT ================= */

function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)

      const jobsSnap = await getDocs(query(collection(db, "jobs")))
      const jobsData: Job[] = jobsSnap.docs.map(docSnap => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          title: data.title,
          company: data.company || "Unknown",
          location: data.location,
          type: data.type || "Full Time",
        }
      })

      setJobs(jobsData)
      setLoading(false)
    }

    fetchJobs()
  }, [])

  const renderLocation = (
    loc?: string | { city?: string; country?: string }
  ) => {
    if (!loc) return "Remote"
    if (typeof loc === "string") return loc
    const parts = []
    if (loc.city) parts.push(loc.city)
    if (loc.country) parts.push(loc.country)
    return parts.join(", ") || "Remote"
  }

  if (loading) return <p>Loading home page...</p>

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <h1>
            Find Your <span>Dream Job</span>
            <br /> In One Click
          </h1>
          <p>Search thousands of jobs from top global companies</p>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="featured container">
        <h2>Featured Jobs</h2>

        <div className="job-list">
          {jobs.map(job => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="job-card-link"
            >
              <div className="job-card">
                <div className="job-top">
                  <h3>{job.title}</h3>
                  <span
                    className={`tag ${job.type
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {job.type}
                  </span>
                </div>

                <p>
                  <i className="ri-building-line"></i>
                  {job.company} • {renderLocation(job.location)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <div className="container">
          <h2>Why Choose JobCy?</h2>

          <div className="why-grid">
            <div className="why-card">
              <i className="ri-verified-badge-line"></i>
              <h3>10,000+ Verified Jobs</h3>
              <p>We manually verify every job for accurate information.</p>
            </div>

            <div className="why-card">
              <i className="ri-building-4-line"></i>
              <h3>Trusted by Top Companies</h3>
              <p>Used by global brands and fast-growing startups.</p>
            </div>

            <div className="why-card">
              <i className="ri-hand-heart-line"></i>
              <h3>Easy Application</h3>
              <p>Apply for your desired job in just one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Find Your Next Job?</h2>
          <Link to="/signup" className="cta-btn">
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
