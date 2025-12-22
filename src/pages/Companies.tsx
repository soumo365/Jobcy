import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom"
import { db } from "../firebase/config"

/* ================= TYPES ================= */

type Company = {
  id: string
  companyName: string
  profilePic: string
  location?: string | { city?: string; country?: string }
  about: string
}

/* ================= COMPONENT ================= */

function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)

      const q = query(collection(db, "users"), where("role", "==", "employer"))
      const snap = await getDocs(q)

      const result: Company[] = snap.docs.map(docSnap => {
        const data = docSnap.data()
        const profile = data?.profile || {}

        return {
          id: docSnap.id,
          companyName: profile.companyName || "Unknown Company",
          profilePic: profile.profilePic || "/company-placeholder.png",
          location: profile.location,
          about: profile.about || "",
        }
      })

      setCompanies(result)
      setLoading(false)
    }

    fetchCompanies()
  }, [])

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

  if (loading) return <p>Loading companies...</p>

  return (
    <section className="companies-page">
      <div className="container">
        <h1>Companies</h1>

        {companies.length === 0 && <p>No companies found.</p>}

        <div className="company-grid">
          {companies.map(company => (
            <Link
              key={company.id}
              to={`/companies/${company.id}`}
              className="company-card"
            >
              <img
                src={company.profilePic}
                alt={company.companyName}
              />
              <h3>{company.companyName}</h3>
              <p className="location">{renderLocation(company.location)}</p>
              {company.about && <p className="about">{company.about.slice(0, 80)}...</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Companies
