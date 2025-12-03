import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase/config";

interface AuthContextType {
    user : User | null,
    loading : boolean
}


const AuthContext = createContext<AuthContextType>({
    user : null ,
    loading : true
})



export function AuthProvider({ children } : {children : ReactNode}){
    const [user , setUser] = useState<User | null>(null);
    const [loading , setLoading] = useState<boolean>(true);

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser:any) => {
      setUser(currentUser);
      setLoading(false);
    });
     return () => unsubscribe();
    },[]);


      return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;


}


export function useAuth() {
  return useContext(AuthContext);
}