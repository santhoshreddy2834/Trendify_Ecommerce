// src/components/Login.jsx

import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="bg-white bg-opacity-5 backdrop-blur-md shadow-xl rounded-lg px-10 py-8 w-full max-w-md border border-gray-600">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">Login to Trendify</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center bg-white bg-opacity-10 rounded-md p-2">
            <FaEnvelope className="text-white mx-2" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent text-white w-full outline-none px-2 py-1"
            />
          </div>

          <div className="flex items-center bg-white bg-opacity-10 rounded-md p-2">
            <FaLock className="text-white mx-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent text-white w-full outline-none px-2 py-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-white text-sm text-center my-4">
          Don't have an account? <Link to="/register" className="text-orange-400 hover:underline">Register</Link>
        </div>

        <div className="text-white text-center mb-3">Or login with</div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-white text-black font-medium py-2 rounded hover:shadow-md transition"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center bg-[#1877f2] text-white font-medium py-2 rounded hover:bg-[#145dbf] transition"
          >
            <FaFacebook className="mr-2" /> Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
