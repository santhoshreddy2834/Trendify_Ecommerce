import React from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const sendUserToBackend = async (firebaseUser, provider) => {
    try {
      await axios.post('http://localhost:5000/api/users/login', {
        name: firebaseUser.displayName || 'No Name',
        email: firebaseUser.email,
        authProvider: provider,
        phone: firebaseUser.phoneNumber || '',
      });
    } catch (err) {
      console.error("❌ Backend error:", err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await sendUserToBackend(result.user, 'google');
      navigate('/products'); // ✅ redirect to Products
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await sendUserToBackend(result.user, 'facebook');
      navigate('/products'); // ✅ redirect to Products
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await sendUserToBackend(result.user, 'email/password');
      navigate('/products'); // ✅ redirect to Products
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Trendify</h2>

        <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
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
            Sign In
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-2 rounded flex items-center justify-center gap-2 mb-3 hover:bg-gray-200"
        >
          <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
          Continue with Google
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" alt="Facebook" />
          Continue with Facebook
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account? <a href="/register" className="text-orange-400 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
