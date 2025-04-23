import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (auth.currentUser) {
      navigate("/home"); // ✅ if logged in, go to dashboard
    } else {
      navigate("/products"); // ✅ if not logged in, go to product catalog
    }
  };

  const handleScroll = () => {
    const section = document.getElementById("learn-more");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center p-8 h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-400">
          Welcome to Trendify – Your Smart Shopping Destination
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Discover the best trends, track your orders, and personalize your experience.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md font-semibold text-white"
          >
            Get Started
          </button>
          <button
            onClick={handleScroll}
            className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-md font-semibold text-white"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Learn More Section */}
      <section id="learn-more" className="bg-gray-900 py-16 px-6 text-center">
        <h2 className="text-3xl text-orange-400 font-bold mb-4">Why Trendify?</h2>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">
          Trendify is your go-to e-commerce store designed for convenience, style, and smart shopping. 
          Get access to curated collections, secure checkout, and real-time tracking — all in one place.
        </p>
      </section>
    </div>
  );
};

export default Landing;
