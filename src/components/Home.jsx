import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700">
        <div>
          <p className="text-xl font-semibold mb-2">Please login to access your dashboard.</p>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-6 flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">Trendify Dashboard</h1>
          <p className="text-sm text-gray-500">Your personalized e-commerce experience</p>
        </div>
        <div className="flex items-center gap-4">
          {user.photoURL && (
            <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border" />
          )}
          <div className="text-right">
            <p className="text-sm font-medium">{user.email}</p>
            <button
              onClick={handleLogout}
              className="text-xs text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🛒 Browse Products</h2>
          <p className="text-sm text-gray-500">Explore the latest collections tailored for you.</p>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Shop Now
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📦 Track Orders</h2>
          <p className="text-sm text-gray-500">Check your order status and history in one place.</p>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            View Orders
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">👤 Account Settings</h2>
          <p className="text-sm text-gray-500">Manage your profile, addresses, and preferences.</p>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Update Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


