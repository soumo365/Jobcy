import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // adjust path if needed

interface Job {
  id: string;
  title: string;
  category:string;
  companyName: string;
  location: {
    city: string;
    country: string;
    type: "remote" | "onsite" | "hybrid";
  };
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsList: Job[] = [];
        querySnapshot.forEach((doc) => {
          jobsList.push(doc.data() as Job);
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

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category
      ? job.category.toLowerCase() === category.toLowerCase()
      : true;
    const locationMatch = location
      ? job.location.city.toLowerCase() === location.toLowerCase()
      : true;
    const typeMatch = jobType
      ? job.employmentType.toLowerCase() === jobType.toLowerCase()
      : true;

    return titleMatch && categoryMatch && locationMatch && typeMatch;
  });

  if (loading) return <p>Loading jobs...</p>;

  return (
    <section className="job-listing-page container">
      {/* PAGE TITLE */}
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

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Remote">Remote</option>
        </select>

        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>

        <button className="filter-btn" onClick={(e) => e.preventDefault()}>
          Search
        </button>
      </div>

      {/* JOB LIST GRID */}
      <div className="job-list-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
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
                {job.companyName} • {job.location.city}
              </p>
              <p className="desc">{job.description}</p>

              <div className="job-meta">
                <span>
                  {job.salary.visible
                    ? `${job.salary.currency} ${job.salary.min} - ${job.salary.max}`
                    : "Salary Hidden"}
                </span>
                <span>{job.experienceLevel}</span>
                <button className="apply-btn">Apply Now</button>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      
    </section>
  );
};

export default JobPage;
