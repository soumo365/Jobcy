import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";



// register start

export async function register(email: string, password: string) {
     return await createUserWithEmailAndPassword(auth, email, password);
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