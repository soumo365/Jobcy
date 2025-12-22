import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import JobPage from "../pages/Job";
import CandidateProfile from "../pages/CandidateProfile";
import EditCandidateProfile from "../pages/EditCandidateProfile";
import EmployerProfile from "../pages/employerPages/EmployerProfile";
import EditEmployerProfile from "../pages/employerPages/EditEmployerProfile";
import PostJob from "../pages/employerPages/PostJob";
import JobDetails from "../pages/JobDetails";
import ApplyJob from "../pages/Apply";
import ApplicationSuccess from "../pages/ApplicationSucess";
import MyJobs from "../pages/myJobs";
import EmployerMyJobs from "../pages/employerPages/EmployerMyJobs";
import EmployerJobApplicants from "../pages/employerPages/EmployerJobApplicants";
import ApplicantDetails from "../pages/employerPages/Applicants-details";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";




const  router = createBrowserRouter([
    {
    path : "/",
    Component : RootLayout,
    children : [
        {
           index : true ,
           Component: Home
        },
         {
           path : "/about" ,
           Component: About
        },
         {
           path : "/candidate-profile" ,
           Component: CandidateProfile
        },
        {
           path: "candidate-profile/edit-candidate-profile",
            Component: EditCandidateProfile
           },
         {
           path : "/employer-profile" ,
           Component: EmployerProfile
        },
        {
           path: "employer-profile/edit-employer-profile",
            Component: EditEmployerProfile
           },
        {
           path: "employer-my-jobs",
            Component: EmployerMyJobs
           },
      {
  path: "employer-my-jobs/employer-job-applicants/:jobId",
  Component: EmployerJobApplicants
}
,
{
  path: "employer-my-jobs/employer-job-applicants/:jobId/:applicantUid",
  Component: ApplicantDetails
},

        {
           path: "/post-job",
            Component: PostJob
           },

         {
           path : "/about" ,
           Component: About
        },
         {
           path : "/companies" ,
           Component: Companies
        },
        {
  path: "/companies/:companyId",
  Component: CompanyDetails
},

         {
           path : "/jobs" ,
           Component: JobPage
        },
         {
           path: "/jobs/:jobId",
            Component: JobDetails
           },
              {
           path: "/jobs/:jobId/apply",
            Component: ApplyJob
           },
             {
           path: "/jobs/:jobId/apply/success",
            Component: ApplicationSuccess
           },
            {
           path: "/my-jobs",
            Component: MyJobs
           },
         
        
        
    ]
},

{
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/signin",
    Component:SignIn,
  },
 

])



export default router;