import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear(); // Optional: Clear data
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-orange-500">Welcome to Trendify</h1>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">
            Logout
          </button>
        </div>
        <p className="text-gray-400">Logged in as: <strong>{user?.email}</strong></p>
        <p className="mt-4 text-gray-300">Here you can browse products, track orders, and manage your account!</p>
      </div>
    </div>
  );
};

export default Home;
