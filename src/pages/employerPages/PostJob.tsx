import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const { user } = useAuth();
  const navigate = useNavigate();

  interface Job {
    id: string;
    title: string;
    category: string;
    companyName: string;
    companyLogo: string;
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
    skillsRequired: string[];
    description: string;
    responsibilities: string[];
    requirements: string[];
    postedBy: string;
    role: "employer";
    status: "open" | "closed";
    applicantsCount: number;
    views: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  const [jobData, setJobData] = useState<Job>({
    id: "",
    title: "",
    category: "",
    companyName: "",
    companyLogo: "",
    location: { city: "", country: "", type: "onsite" },
    employmentType: "full-time",
    experienceLevel: "fresher",
    salary: { min: 0, max: 0, currency: "INR", visible: true },
    skillsRequired: [],
    description: "",
    responsibilities: [],
    requirements: [],
    postedBy: "",
    role: "employer",
    status: "open",
    applicantsCount: 0,
    views: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  /* ---------------- HANDLERS ---------------- */
  const updateField = (field: keyof Job, value: any) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const updateLocation = (field: keyof Job["location"], value: string) => {
    setJobData(prev => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const skill = e.currentTarget.value.trim();
      if (skill && !jobData.skillsRequired.includes(skill)) {
        setJobData(prev => ({
          ...prev,
          skillsRequired: [...prev.skillsRequired, skill],
        }));
      }
      e.currentTarget.value = "";
    }
  };

  const removeSkill = (index: number) => {
    setJobData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("User not logged in");
      return;
    }
    const jobId = crypto.randomUUID();
    await setDoc(doc(db, "jobs", jobId), {
      ...jobData,
      id: jobId,
      postedBy: user.uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    alert("Job published successfully ✅");
    navigate("/employer-jobs");
  };

  return (
    <>
      <section className="postJob">
        <div className="container">
          <div className="pageHeader">
            <h1>Post a New Job</h1>
            <p>Reach thousands of qualified candidates instantly</p>
          </div>

          <form className="postJobForm" onSubmit={handleSubmit}>
            {/* ---------------- Job Details ---------------- */}
            <div className="formCard">
              <h2>Job Details</h2>
              <div className="grid">
                <div className="inputBox">
                  <label>Job Title</label>
                  <input
                    type="text"
                    placeholder="Frontend Developer"
                    value={jobData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <label>Job Category</label>
                  <select
                    value={jobData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>HR</option>
                  </select>
                </div>

                <div className="inputBox">
                  <label>Employment Type</label>
                  <select
                    value={jobData.employmentType}
                    onChange={(e) =>
                      updateField("employmentType", e.target.value)
                    }
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div className="inputBox">
                  <label>Experience Level</label>
                  <select
                    value={jobData.experienceLevel}
                    onChange={(e) =>
                      updateField("experienceLevel", e.target.value)
                    }
                  >
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ---------------- Location & Salary ---------------- */}
            <div className="formCard">
              <h2>Location & Salary</h2>
              <div className="grid">
                <div className="inputBox">
                  <label>Job Location</label>
                  <input
                    type="text"
                    placeholder="Bangalore / Remote"
                    value={jobData.location.city}
                    onChange={(e) => updateLocation("city", e.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <label>Salary Range</label>
                  <input
                    type="text"
                    placeholder="₹6 LPA - ₹10 LPA"
                    // Optional: you can implement min/max salary inputs here
                  />
                </div>

                <div className="inputBox">
                  <label>Application Deadline</label>
                  <input type="date" />
                </div>

                <div className="inputBox">
                  <label>Vacancies</label>
                  <input type="number" placeholder="Number of openings" />
                </div>
              </div>
            </div>

            {/* ---------------- Job Description ---------------- */}
            <div className="formCard">
              <h2>Job Description</h2>
              <textarea
                placeholder="Describe job responsibilities, requirements, and expectations..."
                value={jobData.description}
                onChange={(e) => updateField("description", e.target.value)}
              ></textarea>
            </div>

            {/* ---------------- Required Skills ---------------- */}
            <div className="formCard">
              <h2>Required Skills</h2>
              <div className="inputBox">
                <input
                type="text"
                placeholder="Add skill and press Enter"
                onKeyDown={handleSkillKeyDown}
              />
              </div>
              <div className="skillTags">
                {jobData.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="skillTag"
                    onClick={() => removeSkill(index)}
                  >
                    {skill} ×
                  </span>
                ))}
              </div>
            </div>

            {/* ---------------- Job Benefits ---------------- */}
            <div className="formCard">
              <h2>Job Benefits</h2>
              <div className="checkboxGrid">
                <label>
                  <input type="checkbox" /> Work From Home
                </label>
                <label>
                  <input type="checkbox" /> Health Insurance
                </label>
                <label>
                  <input type="checkbox" /> Paid Leaves
                </label>
                <label>
                  <input type="checkbox" /> Flexible Hours
                </label>
                <label>
                  <input type="checkbox" /> Career Growth
                </label>
                <label>
                  <input type="checkbox" /> Performance Bonus
                </label>
              </div>
            </div>

            {/* ---------------- Actions ---------------- */}
            <div className="actionRow">
              <button type="button" className="draftBtn">
                Save as Draft
              </button>
              <button type="submit" className="postBtn">
                Publish Job
              </button>
            </div>
          </form>
        </div>
      </section>

     
    </>
  );
}

export default PostJob;
