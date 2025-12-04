import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";



// register start

export async function register(email: string, password: string,role: string) {
     const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
     const user = userCredential.user;

     await setDoc(doc(db, "users" , user.uid),{
        uid : user.uid,
        email: user.email,
        role,
        createdAt: new Date(),
        Candidateprofile : {}

     })
     return user;
     
}

// register end


// login start

export async function login(email: string, password: string) {
     return await signInWithEmailAndPassword(auth, email, password);
}

// login end



// log out start

export async function logout() {
     return await signOut(auth);
}

// log out end