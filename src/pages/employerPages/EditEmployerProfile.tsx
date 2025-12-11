import { useState } from "react";


function EditEmployerProfile() {

  interface  employerProfileDataType{
      companyName : string;
      tagline : string;
      industry : string;
      companySize : string;
      location : string;
      website:string;
      about: string;
      benefits : string[];
      logo : string;
      profilePic : string,

  }

  const [employerProfileData , setEmployerProfileData] = useState<employerProfileDataType>({
      companyName : "",
      tagline : "",
      industry : "",
      companySize : "",
      location : "",
      website:"",
      about: "",
      benefits : [],
      logo : "",
      profilePic :"",
  }) 


const handleBenefitKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === "Enter" && e.currentTarget.value.trim() !== ""){
      e.preventDefault();
     const newBenefit = e.currentTarget.value.trim();
     setEmployerProfileData(prev =>({
        ...prev,
        benefits : [...prev.benefits , newBenefit]
     }))
     e.currentTarget.value = "";
    }
}
const removeBenefit = (index: number) => {
   setEmployerProfileData(prev =>({
        ...prev,
        benefits : prev.benefits.filter((_, i) => i !== index)
     }))
};


const [selectedPicFile, setSelectedPicFile] = useState<File | null>();


const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  console.log(file);
  if (!file) return;
  const previewURL = URL.createObjectURL(file);
   setSelectedPicFile(file);
  setEmployerProfileData(prev => ({
    ...prev,
    profilePic: previewURL,
  }));
  console.log(previewURL);
};

  return (
     <>
<section className="employerEditProfile">
  <div className="container">
    <div className="pageHeader">
      <h1>Edit Company Profile</h1>
      <p>Keep your company information up to date</p>
    </div>

    <form className="editForm">


      <div className="formCard">
        <h2>Company Information</h2>

        <div className="grid">
          <div className="inputBox">
            <label>Company Name</label>
            <input type="text" placeholder="Company Name" value={employerProfileData.companyName} onChange={(e)=>
            {setEmployerProfileData({
              ...employerProfileData ,
              companyName : e.target.value
            })}}     />
          </div>

          <div className="inputBox">
            <label>Tagline</label>
            <input type="text" placeholder="Company Tagline" value={employerProfileData.tagline} onChange={(e)=>{
              setEmployerProfileData({
                ...employerProfileData,
                tagline : e.target.value
              })
            }} />
          </div>

          <div className="inputBox">
            <label>Industry</label>
            <input type="text" placeholder="Industry" value={employerProfileData.industry} onChange={(e)=>{
              setEmployerProfileData({
                ...employerProfileData,
                industry : e.target.value
              })}}/>
          </div>

          <div className="inputBox">
            <label>Company Size</label>
            <select value={employerProfileData.companySize} onChange={(e)=>{
              setEmployerProfileData({
                ...employerProfileData,
                companySize : e.target.value
              })}}>
              <option>1 - 10 Employees</option>
              <option>10 - 50 Employees</option>
              <option>50 - 200 Employees</option>
              <option>200+ Employees</option>
            </select>
          </div>

          <div className="inputBox">
            <label>Location</label>
            <input type="text" placeholder="City, State" value={employerProfileData.location} onChange={(e)=>{
              setEmployerProfileData({
                ...employerProfileData,
                location : e.target.value
              })}} />
          </div>

          <div className="inputBox">
            <label>Website</label>
            <input type="url" placeholder="https://company.com"  value={employerProfileData.website} onChange={(e)=>{
              setEmployerProfileData({
                ...employerProfileData,
                website : e.target.value
              })}}/>
          </div>
        </div>
      </div>

      
      <div className="formCard">
        <h2>About Company</h2>

        <textarea placeholder="Write about your company..." value={employerProfileData.about} onChange={(e)=>{
              setEmployerProfileData({
                ...employerProfileData,
                about : e.target.value
              })}}></textarea>
      </div>

     
      <div className="formCard">
        <h2>Benefits & Culture</h2>
 <div className="inputBox">
       <input type="text" placeholder="Add benefit and press Enter"  onKeyDown={handleBenefitKeyDown}/>
 </div>
 

        <div className="benefitsList">
          {
            employerProfileData.benefits.map((item,index)=>(
                <span key={index}>{item}</span>
            ))
          }
        </div>
      </div>

   
      <div className="formCard">
        <h2>Company Logo</h2>

        <div className="uploadBox">
          <input type="file" id="logoUpload" onChange={handleProfilePicUpload}/>
          <label >
            Click to upload logo (PNG / JPG)
          </label>
        </div>
      </div>

  
      <button className="saveBtn">Save Changes</button>
    </form>
  </div>
</section>

     </>
  )
}

export default EditEmployerProfile