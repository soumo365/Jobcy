import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface Job {
  id: string;
  title: string;
  category: string;
  companyName: string;
  location: string | { city?: string; country?: string; type?: string };
  employmentType: "full-time" | "part-time" | "internship" | "contract";
  experienceLevel: "fresher" | "junior" | "mid" | "senior";
  salary: {
    min: number;
    max: number;
    currency: "INR" | "USD";
    visible: boolean;
  };
  description: string;
  skillsRequired: string[];
}

const JobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
  const jobsList: Job[] = querySnapshot.docs.map((doc) => {
  const data = doc.data() as Omit<Job, "id">; // remove id from the spread
  return {
    id: doc.id,  // unique ID from Firestore document
    ...data,
  };
});

        setJobs(jobsList);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const renderLocation = (loc: string | { city?: string; country?: string }) => {
    if (!loc) return "Remote";
    if (typeof loc === "string") return loc;
    const parts = [];
    if (loc.city) parts.push(loc.city);
    if (loc.country) parts.push(loc.country);
    return parts.join(", ") || "Remote";
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category ? job.category.toLowerCase() === category.toLowerCase() : true;
    const locationMatch = location
      ? renderLocation(job.location).toLowerCase().includes(location.toLowerCase())
      : true;
    const typeMatch = jobType ? job.employmentType.toLowerCase() === jobType.toLowerCase() : true;

    return titleMatch && categoryMatch && locationMatch && typeMatch;
  });

  if (loading) return <p>Loading jobs...</p>;

  return (
    <section className="job-listing-page container">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Find Your Perfect Job</h1>
        <p>Explore thousands of job opportunities curated for you</p>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {/* JOB GRID */}
      <div className="job-list-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link
              to={`/jobs/${job.id}`}
              key={job.id}
              className="job-card"
            >
              <div className="top">
                <h3>{job.title}</h3>
                <span
                  className={`tag ${
                    job.employmentType === "full-time"
                      ? "full"
                      : job.employmentType === "part-time"
                      ? "part"
                      : job.employmentType === "internship"
                      ? "intern"
                      : "contract"
                  }`}
                >
                  {job.employmentType.replace("-", " ")}
                </span>
              </div>
              <p className="company">
                {job.companyName} • {renderLocation(job.location)}
              </p>
              <p className="desc">{job.description}</p>

              <div className="job-meta">
                <span>
                  {job.salary.visible
                    ? `${job.salary.currency} ${job.salary.min} - ${job.salary.max}`
                    : "Salary Hidden"}
                </span>
                <span>{job.experienceLevel}</span>
              </div>
            </Link>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </section>
  );
};

export default JobPage;
