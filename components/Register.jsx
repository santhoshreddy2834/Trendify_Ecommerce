import React from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await axios.post('http://localhost:5000/api/users/login', {
        name,
        email,
        authProvider: 'email/password',
        phone: '',
      });
      navigate('/');
    } catch (err) {
      console.error("❌ Registration error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register to Trendify</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 rounded bg-gray-700 placeholder-gray-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 placeholder-gray-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 py-2 rounded hover:bg-orange-600 font-semibold"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-orange-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
