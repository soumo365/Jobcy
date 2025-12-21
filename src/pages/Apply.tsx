import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "../firebase/config"
import { uploadToSupabase } from "../services/FileUploadServices"
import { useAuth } from "../context/AuthContext"

function ApplyJob() {
  const navigate = useNavigate()

  const { jobId } = useParams()
  const { userData } = useAuth()

  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    coverLetter: "",
  })

  const [resume, setResume] = useState<File | null>(null)

  // 🔹 Fetch job by ID
  useEffect(() => {
    if (!jobId) return

    const fetchJob = async () => {
      const snap = await getDoc(doc(db, "jobs", jobId))
      if (snap.exists()) {
        setJob({ id: snap.id, ...snap.data() })
      }
    }

    fetchJob()
  }, [jobId])

  // 🔹 Prefill form from logged-in user
  useEffect(() => {
    if (!userData) return

    setForm(prev => ({
      ...prev,
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      location: userData.location || "",
    }))
  }, [userData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🔹 Format job location (FIX FOR YOUR ERROR)
  const formatJobLocation = (location: any) => {
    if (!location) return ""
    const { city, country, type } = location

    if (city && country) return `${city}, ${country}`
    if (type) return type
    return ""
  }

  // 🔹 Submit application
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!resume) return alert("Please upload resume")

  try {
    setLoading(true)

    // 1️⃣ Upload resume to Supabase
    const resumeUrl = await uploadToSupabase(resume, "resumes")

    // 2️⃣ Save application in Firebase
    await addDoc(collection(db, "applications"), {
      jobId: job.id,
      employerUid: job.postedBy,
      applicantUid: userData.uid,

      ...form,
      resumeUrl,

      status: "in-review", // ✅ VERY IMPORTANT
      createdAt: serverTimestamp(),
    })

    // 3️⃣ Redirect to success page
    navigate(`/jobs/${job.id}/apply/success`)
  } catch (error) {
    console.error(error)
    alert("Something went wrong")
  } finally {
    setLoading(false)
  }
}



  // 🔹 Guard render
  if (!job) return <p>Loading job...</p>

  return (
    <section className="apply-page">
      <div className="container apply-grid">

        {/* LEFT: JOB INFO */}
        <div className="job-summary">
          <div className="company-box">
            <img
              src={job.employer?.profilePic || "/default-avatar.png"}
              alt="Company"
            />
            <div>
              <h3>{job.title}</h3>
              <p>
                {job.company} • {formatJobLocation(job.location)} • {job.type}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: APPLY FORM */}
        <div className="apply-form">
          <h2>Apply for this job</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label>Resume (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={e => setResume(e.target.files?.[0] || null)}
                required
              />
            </div>

            <div className="form-row">
              <label>Cover Letter</label>
              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
              />
            </div>

            <button className="apply-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

export default ApplyJob
