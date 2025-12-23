import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react"
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { uploadToSupabase } from "../services/FileUploadServices";





function EditCandidateProfile() {
  const {user,userData, setUserData,loading} =  useAuth();
  if (loading) return <p>Loading...</p>;
if (!userData) return <p>No user data found</p>;

const userDetails = userData.profile || {};
const navigate = useNavigate();


  const [selectedPicFile, setSelectedPicFile] = useState<File | null>(null);
const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);


  interface Experience {
  jobTitle: string;
  company: string;
  startYear: string;
  endYear: string;
  description: string;
}

interface CandidateProfile {
  profilePic:string,
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  experience: Experience[];
  skills: string[];
  resume: string;
}


 const [candidateProf, setCandidateProf] = useState<CandidateProfile>({
  profilePic:"",
  fullName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  experience: [
    {
      jobTitle: "",
      company: "",
      startYear: "",
      endYear: "",
      description: "",
    }
  ],
  skills: [],
  resume: ""
});

const addExperience = () => {
   setCandidateProf((prev)=>({
     ...prev,
     experience:[
      ...prev.experience,
      {jobTitle: "", company: "", startYear: "", endYear: "", description: "" }
     ]
   }));
}
function removeExperience(index: number) {
  setCandidateProf(prev => {
    const updated = [...prev.experience];
    updated.splice(index, 1);
    return { ...prev, experience: updated };
  });
}

const handleSkillKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === "Enter" && e.currentTarget.value.trim() !== ""){
      e.preventDefault();
     const newSkill = e.currentTarget.value.trim();
     setCandidateProf(prev =>({
        ...prev,
        skills : [...prev.skills , newSkill]
     }))
     e.currentTarget.value = "";
    }
}
const removeSkill = (index: number) => {
   setCandidateProf(prev =>({
        ...prev,
        skills : prev.skills.filter((_, i) => i !== index)
     }))
};







// function handleExperienceChange(index, field, value) {
//   setCandidateProf(prev => {
//     const updatedExp = [...prev.experience]; // copy all jobs
//     updatedExp[index][field] = value;        // update the specific field in the specific job new
//     return { ...prev, experience: updatedExp }; // return new notebook
//   });
// }

const handleExperienceChange = (
  index: number,
  field: keyof Experience,
  value: string
) => {
  setCandidateProf(prev => {
    const updatedExp = [...prev.experience];    // copy array
    updatedExp[index] = {                       // update specific job
      ...updatedExp[index],
      [field]: value
    };
    return { ...prev, experience: updatedExp }; // return updated object
  });
};

console.log(userData);



  /* ================= FILE SELECT (LOCAL PREVIEW ONLY) ================= */

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPicFile(file);
    setCandidateProf(prev => ({
      ...prev,
      profilePic: URL.createObjectURL(file), // blob preview
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedResumeFile(file);
    setCandidateProf(prev => ({
      ...prev,
      resume: URL.createObjectURL(file), // blob preview
    }));
  };

  /* ================= SUPABASE UPLOAD ================= */






  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("User not logged in!");

    let profilePicUrl = userDetails.profilePic || "";
    let resumeUrl = userDetails.resume || "";

    // upload ONLY on submit
 if (selectedPicFile) {
  profilePicUrl = await uploadToSupabase(selectedPicFile, "profile-pic");
}

if (selectedResumeFile) {
  resumeUrl = await uploadToSupabase(selectedResumeFile, "resume");
  console.log(resumeUrl);
}
    const updatedProfile = {
      ...candidateProf,
      profilePic: profilePicUrl,
      resume: resumeUrl,
    };

    await updateDoc(doc(db, "users", user.uid), {
      profile: updatedProfile,
      updatedAt: new Date(),
    });

    setUserData((prev: any) => ({
      ...prev,
      profile: updatedProfile,
    }));

    alert("Profile updated successfully!");
    navigate("/candidate-profile");
  };










  return (
   <>
      <section className="editProfilePage">
      <div className="container">
     

    <div className="profileHeader">
      <h1>Edit Your Profile</h1>
      <p>Update your personal information and resume details</p>
    </div>

    <form className="editProfileForm" onSubmit={handleSubmit}>
   <div className="profilePicSection">
  <div className="picWrapper">
   <img
  src={
    candidateProf.profilePic ||
    userDetails?.profilePic ||
    "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
  }
  className="profilePic"
/>

 

    <label className="uploadBtn">
      <i className="ri-camera-line"></i>
      <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
    </label>
  </div>

  <p className="hintText">Click the camera icon to upload your profile picture</p>
</div>
    
      <div className="formBlock">
        <h2 className="blockTitle">Personal Details</h2>

        <div className="formGrid">
          <div className="inputField">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name"  onChange={(e)=>setCandidateProf(
              {
                ...candidateProf ,
              fullName: e.target.value,
              }

            )} value={candidateProf.fullName || userDetails.fullName || ""}/>
          </div>

          <div className="inputField">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email"  onChange={(e)=>setCandidateProf(
              {
                ...candidateProf ,
              email: e.target.value,
              }

            )} value={candidateProf.email || userDetails.email || ""}/>
          </div>

          <div className="inputField">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter your phone number"  onChange={(e)=>setCandidateProf(
              {
                ...candidateProf ,
              phone: e.target.value,
              }

            )} value={candidateProf.phone || userDetails.phone || ""}/>
          </div>

          <div className="inputField">
            <label>Location</label>
            <input type="text" placeholder="City, State"  onChange={(e)=>setCandidateProf(
              {
                ...candidateProf ,
              location: e.target.value,
              }

            )} value={candidateProf.location || userDetails.location || ""}/>
          </div>

          <div className="inputField fullWidth">
            <label>Bio</label>
            <textarea placeholder="Write something about yourself..."  onChange={(e)=>setCandidateProf(
              {
                ...candidateProf ,
              bio: e.target.value,
              }

            )} value={candidateProf.bio || userDetails.bio || ""}></textarea>
          </div>
        </div>
      </div>

    {candidateProf.experience.map((job, index) => (
  <div className="formBlock" key={index}>
    <h2 className="blockTitle">Experience {index + 1}</h2>

    <div className="experienceItem">
      <div className="formGrid">

        <div className="inputField">
          <label>Job Title</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={job.jobTitle}
            onChange={(e) =>
              handleExperienceChange(index, "jobTitle", e.target.value)
            }
          />
        </div>

        <div className="inputField">
          <label>Company</label>
          <input
            type="text"
            placeholder="Company name"
            value={job.company}
            onChange={(e) =>
              handleExperienceChange(index, "company", e.target.value)
            }
          />
        </div>

        <div className="inputField">
          <label>Start Year</label>
          <input
            type="text"
            placeholder="2020"
            value={job.startYear}
            onChange={(e) =>
              handleExperienceChange(index, "startYear", e.target.value)
            }
          />
        </div>

        <div className="inputField">
          <label>End Year</label>
          <input
            type="text"
            placeholder="2024"
            value={job.endYear}
            onChange={(e) =>
              handleExperienceChange(index, "endYear", e.target.value)
            }
          />
        </div>

        <div className="inputField fullWidth">
          <label>Description</label>
          <textarea
            placeholder="Describe your role..."
            value={job.description}
            onChange={(e) =>
              handleExperienceChange(index, "description", e.target.value)
            }
          ></textarea>
        </div>

      </div>
    </div>
    <button className="removeExpBtn" type="button" onClick={()=>{removeExperience(index)}}>- Remove this Experience</button>
  </div>
))}
   
    
      
<button className="addMoreBtn" type="button" onClick={addExperience}>+ Add More Experience</button>
      <div className="formBlock">
        <h2 className="blockTitle">Skills</h2>

        <div className="chipInput">
          <input type="text" placeholder="Add a skill and press Enter" onKeyDown={handleSkillKeyDown} />
        </div>

        <div className="chipList">
  {candidateProf.skills.map((skill, index) => (
    <span className="chip" key={index}>
      {skill}
      <span className="close" onClick={() => removeSkill(index)}>×</span>
    </span>
  ))}
</div>

      </div>

     
      <div className="formBlock">
        <h2 className="blockTitle">Resume</h2>

        
          <div className="uploadBox">
  <input 
      type="file" 
      id="resumeUpload"  
      accept=".pdf" 
      onChange={handleResumeUpload}
  />

  <label htmlFor="resumeUpload" className="uploadLabel">
    <span>
      {candidateProf.resume
        ? candidateProf.resume.split("/").pop()  // show only file name
        : "Click to upload Resume (PDF)"}
    </span>
  </label>
</div>

       
      </div>

      <button className="submitBtn">Save Changes</button>
    </form>
  </div>
</section>

   </>
  )
}

export default EditCandidateProfile