import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCxd4xjY7ImdjnV_T7nBz7sNFjWbdBuhAg",
  authDomain: "daudflix.firebaseapp.com",
  projectId: "daudflix",
  storageBucket: "daudflix.firebasestorage.app",
  messagingSenderId: "332937159732",
  appId: "1:332937159732:web:06397d8a0a6a4779ec5661",
  measurementId: "G-1B84T3CQ1P",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (email, password, name) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email: user.email,
      name: name,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error.code.split ('/')[1]).split('_').join(' '); 

  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error.message); 
    toast.error(error.code.split ('/')[1]).split('_').join(' '); 
           
  }
};

const logout = () => {
  signOut(auth);
};

export { signup, login, logout, auth, db, analytics };