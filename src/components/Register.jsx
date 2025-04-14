// src/components/Register.jsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-white bg-opacity-5 backdrop-blur-md shadow-lg rounded-lg px-10 py-8 w-full max-w-md border border-gray-700">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center bg-white bg-opacity-10 rounded-md p-2">
            <FaUser className="text-white mx-2" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-transparent text-white w-full outline-none px-2 py-1"
            />
          </div>
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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
