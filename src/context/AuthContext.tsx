import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
    user : User | null,
    userData: any | null,
    setUserData: any,
    loading : boolean
}


const AuthContext = createContext<AuthContextType>({
    user : null ,
    userData : {},
    setUserData : null,
    loading : true
})


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch Firestore user profile
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
   return <AuthContext.Provider value={{ user,userData,setUserData, loading  }}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  return useContext(AuthContext);
}