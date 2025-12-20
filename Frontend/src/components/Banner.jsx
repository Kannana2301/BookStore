import React from "react";
import { Link } from "react-router-dom";
import banner from "../../public/Banner.png";

function Banner() {
  return (
    <>
      {/* Hero Section */}
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
          <div className="space-y-6">
            <div className="badge badge-secondary">📚 Over 1000+ Books Available</div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Discover Your Next{" "}
              <span className="text-pink-500">Great Read</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
              Explore our vast collection of programming, web development, data science, and business books. 
              Learn from industry experts and take your skills to the next level with our curated selection.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/course">
                <button className="btn bg-pink-500 text-white border-none hover:bg-pink-600 px-6">
                  Browse Books
                </button>
              </Link>
              <a href="#features">
                <button className="btn btn-outline px-6">Learn More</button>
              </a>
            </div>
            {/* Stats */}
            <div className="flex gap-8 pt-6">
              <div>
                <h3 className="text-2xl font-bold text-pink-500">1000+</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Books</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-pink-500">50K+</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Readers</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-pink-500">4.8★</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center items-center">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] object-contain"
            alt="BookStore Banner"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our BookStore?</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We provide the best learning resources for developers, designers, and entrepreneurs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl dark:bg-slate-800 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="card-title">Vast Collection</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Access over 1000+ books across programming, design, business, and more
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl dark:bg-slate-800 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="card-title">Expert Authors</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Learn from industry professionals and bestselling authors worldwide
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl dark:bg-slate-800 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="card-title">Instant Access</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Get immediate access to your books and start learning right away
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Categories</h2>
          <p className="text-slate-600 dark:text-slate-300">Browse books by your favorite topics</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/course" className="btn btn-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none hover:scale-105 transition-transform">
            💻 Programming
          </Link>
          <Link to="/course" className="btn btn-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none hover:scale-105 transition-transform">
            🌐 Web Dev
          </Link>
          <Link to="/course" className="btn btn-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none hover:scale-105 transition-transform">
            📊 Data Science
          </Link>
          <Link to="/course" className="btn btn-lg bg-gradient-to-r from-orange-500 to-red-500 text-white border-none hover:scale-105 transition-transform">
            💼 Business
          </Link>
        </div>
      </div>
    </>
  );
}

export default Banner;
