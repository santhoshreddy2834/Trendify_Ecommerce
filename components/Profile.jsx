// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.imgur.com/6VBx3io.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-orange-500 mb-4"
          />
          <h2 className="text-2xl font-bold">{user?.displayName || "User"}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-orange-400">Account Details</h3>
          <ul className="text-sm space-y-1">
            <li><strong>Email:</strong> {user?.email}</li>
            <li><strong>Phone:</strong> {user?.phoneNumber || "Not linked"}</li>
            <li><strong>Provider:</strong> {user?.providerData?.[0]?.providerId}</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
