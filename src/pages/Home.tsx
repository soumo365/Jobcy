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

type Category = {
  id: string
  name: string
  iconClass: string
}

/* ================= COMPONENT ================= */

function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch featured jobs (limit 5)
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

      // Fetch categories
      const categoriesSnap = await getDocs(collection(db, "categories"))
      const categoriesData: Category[] = categoriesSnap.docs.map(docSnap => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          name: data.name,
          iconClass: data.iconClass,
        }
      })

      setJobs(jobsData)
      setCategories(categoriesData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const renderLocation = (loc?: string | { city?: string; country?: string }) => {
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
            Find Your <span>Dream Job</span><br /> In One Click
          </h1>
          <p>Search thousands of jobs from top global companies</p>

          {/* <div className="search-box">
            <div className="input-group">
              <i className="ri-search-line"></i>
              <input type="text" placeholder="Job title, keywords..." />
            </div>

            <div className="input-group">
              <i className="ri-map-pin-line"></i>
              <input type="text" placeholder="Location" />
            </div>

            <button className="btn search-btn">
              <i className="ri-search-2-line"></i> Search
            </button>
          </div> */}
        </div>
      </section>

      {/* CATEGORIES */}
      {/* <section className="categories container">
        <h2>Popular Job Categories</h2>

        <div className="cat-grid">
          {categories.map(cat => (
            <div key={cat.id} className="cat-card">
              <i className={cat.iconClass}></i> {cat.name}
            </div>
          ))}
        </div>
      </section> */}

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
          <span className={`tag ${job.type?.toLowerCase().replace(" ", "-")}`}>
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
          <Link to="/signup" className="cta-btn">Create Free Account</Link>
        </div>
      </section>
    </>
  )
}

export default Home
