"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../../lib/firebase"; // Make sure `provider` is exported
import { useRouter } from "next/navigation";

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Redirect if already logged in
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.push("/article");
  //       onClose();
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  // ✅ Email/Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      router.push("/article");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google login
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
  
    try {
      await signInWithPopup(auth, provider);
      onClose();
      router.push("/article");
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError("You closed the sign-in popup. Try again.");
      
      } else {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="p-6 rounded shadow-md text-center relative w-80 bg-white dark:bg-gray-950 text-black dark:text-gray-50">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-600 dark:bg-gray-800 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-600 dark:bg-gray-800 dark:text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-violet-700 hover:bg-violet-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ✅ Google Login Button */}
        <div className="my-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 488 512" fill="white">
              <path d="M488 261.8c0-17.8-1.6-35.3-4.7-52H249v98.7h134.4c-5.8 31.5-23.4 58.1-49.8 76l79.9 62.2c46.6-43 74.5-106.5 74.5-184.9zM249 492c67.6 0 124.3-22.4 165.7-60.6l-79.9-62.2c-22.2 15.1-50.4 24.1-85.8 24.1-65.8 0-121.6-44.3-141.5-104.2H25v65.4C66.3 435.8 151.6 492 249 492zM107.5 309.1c-5.2-15.6-8.2-32.1-8.2-49.1s3-33.5 8.2-49.1V145.5H25C9 180.1 0 218.3 0 260s9 79.9 25 114.5l82.5-65.4zM249 100.4c35.7 0 67.7 12.3 92.9 36.5l69.6-69.6C370.4 26.5 313.8 0 249 0 151.6 0 66.3 56.2 25 145.5l82.5 65.4C127.4 144.7 183.2 100.4 249 100.4z" />
            </svg>
            {loading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>

        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-violet-700 cursor-pointer underline"
            onClick={() => {
              onClose();
              onSwitchToSignup();
            }}
          >
            Sign up
          </span>
        </p>

        <button onClick={onClose} className="mt-4 text-red-600 underline">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
