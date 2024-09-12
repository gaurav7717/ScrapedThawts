import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { setDoc , doc} from "firebase/firestore";
import { db } from "../../firebase";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: firstName,
      });
      await saveUserToFirestore(user);
      console.log("User signed up: ", user);

      // Redirect to home page after successful signup
      navigate("/");
    } catch (error) {
      console.error("Error signing up: ", error.message);
      if (error.code === "auth/email-already-in-use") {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          navigate("/");
        } catch (e) {
          console.error("Logging error: ", e.message);
        }
      }
    }
  };
  const saveUserToFirestore = async (user) => {
    try {
      console.log("This is saving :" , JSON.stringify(user));
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });
      console.log("User saved to Firestore: ", user.displayName);
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };
  
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in: ", user);

      // Redirect to home page after successful sign-in
      navigate("/");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up / Sign In</h1>
      <form>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
      </form>
    </div>
  );
}

export default SignUp;
