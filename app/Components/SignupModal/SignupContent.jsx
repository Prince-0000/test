"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  var isUserCreatingUnderProgress = false

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (isUserCreatingUnderProgress == true) {
        return
      }
      isUserCreatingUnderProgress = true
     
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signup success", userCredential.user);
      
      try {
        await updateProfile(userCredential.user, {
          displayName: name,
        });

        console.log("Name updated");
        onClose();
        router.push("/");
        isUserCreatingUnderProgress = false
      } catch (updateError) {
        console.error("Error updating name", updateError);
        isUserCreatingUnderProgress = false
      }

      alert("Signup success");
    } catch (err) {
      alert(err);
      console.error("Signup failed", err);
      isUserCreatingUnderProgress = false
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="p-6 rounded shadow-md text-center relative w-80 bg-white dark:bg-gray-950 text-black dark:text-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Sign Up</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-600 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-600 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="bg-violet-700 text-white w-full py-2 rounded 
            hover:bg-violet-900"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-violet-700 cursor-pointer underline"
            onClick={() => {
              onClose();
              onSwitchToLogin(); // Switch to login
            }}
          >
            Login
          </span>
        </p>

        <button onClick={onClose} className="mt-4 text-red-600 underline">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
