import { RouterProvider } from "react-router-dom";
import "./Styles/style.scss";
import router from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
 
function App() {
  return (
     <AuthProvider>
         <RouterProvider router = {router}/>
     </AuthProvider>
  );
}

export default App;
