

function EditEmployerProfile() {
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
            <input type="text" placeholder="Company Name" />
          </div>

          <div className="inputBox">
            <label>Tagline</label>
            <input type="text" placeholder="Company Tagline" />
          </div>

          <div className="inputBox">
            <label>Industry</label>
            <input type="text" placeholder="Industry" />
          </div>

          <div className="inputBox">
            <label>Company Size</label>
            <select>
              <option>1 - 10 Employees</option>
              <option>10 - 50 Employees</option>
              <option>50 - 200 Employees</option>
              <option>200+ Employees</option>
            </select>
          </div>

          <div className="inputBox">
            <label>Location</label>
            <input type="text" placeholder="City, State" />
          </div>

          <div className="inputBox">
            <label>Website</label>
            <input type="url" placeholder="https://company.com" />
          </div>
        </div>
      </div>

      
      <div className="formCard">
        <h2>About Company</h2>

        <textarea placeholder="Write about your company..."></textarea>
      </div>

     
      <div className="formCard">
        <h2>Benefits & Culture</h2>

        <input type="text" placeholder="Add benefit and press Enter" />

        <div className="benefitsList">
          <span>5 Days Working</span>
          <span>Remote Friendly</span>
          <span>Flexible Timings</span>
        </div>
      </div>

   
      <div className="formCard">
        <h2>Company Logo</h2>

        <div className="uploadBox">
          <input type="file" id="logoUpload" />
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