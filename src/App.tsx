import { RouterProvider } from "react-router-dom";
import "./Styles/style.scss";
import router from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
 
function App() {
  return (
     <AuthProvider>
    <JobProvider>
         <RouterProvider router = {router}/>
     </JobProvider>
       </AuthProvider>
  );
}

export default App;
