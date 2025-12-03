import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import JobPage from "../pages/Job";




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
           path : "/jobs" ,
           Component: JobPage
        }
        
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