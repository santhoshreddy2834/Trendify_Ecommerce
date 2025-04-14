import React from 'react';

const Profile = () => {
  // Example static user data (you can later fetch this from Firebase or your backend)
  const user = {
    name: "Santhosh Reddy",
    email: "santhosh@example.com",
    joined: "March 2024",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Your Profile</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-medium">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">Joined:</span> {user.joined}
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
