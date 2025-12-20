import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      icon: "📚",
      title: "Extensive Collection",
      description: "Browse through 100+ carefully curated books across multiple categories"
    },
    {
      icon: "⚡",
      title: "Real-time Updates",
      description: "Get instant notifications when new books are added to our collection"
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "Your data is protected with industry-standard security measures"
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Enjoy a modern, intuitive interface built with the latest technologies"
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Access your library from any device - desktop, tablet, or mobile"
    },
    {
      icon: "🚀",
      title: "Fast Performance",
      description: "Lightning-fast load times and smooth browsing experience"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      avatar: "👩‍💼",
      description: "Passionate about making quality education accessible to everyone"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      avatar: "👨‍💻",
      description: "Building innovative solutions with cutting-edge technology"
    },
    {
      name: "Emily Davis",
      role: "Content Curator",
      avatar: "👩‍🎓",
      description: "Ensuring only the best books make it to our catalog"
    }
  ];

  const stats = [
    { number: "100+", label: "Books Available", icon: "📚" },
    { number: "1000+", label: "Happy Readers", icon: "👥" },
    { number: "7", label: "Categories", icon: "🏷️" },
    { number: "24/7", label: "Support", icon: "💬" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 mt-16">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">
              About BookStore
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Your trusted destination for quality books and learning resources
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-pink-500 p-12 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-7xl mb-4">📖</div>
                  <h3 className="text-2xl font-bold">Our Story</h3>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  Building the Future of Reading
                </h2>
                <div className="space-y-3 text-slate-600 dark:text-slate-300">
                  <p>
                    Founded in 2024, BookStore was born from a simple idea: make quality books accessible to everyone, anywhere, anytime.
                  </p>
                  <p>
                    We believe that books have the power to transform lives, spark creativity, and open doors to new possibilities.
                  </p>
                  <p>
                    Today, we serve thousands of readers worldwide, offering a carefully curated collection spanning programming, business, design, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
              Why Choose Us?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Discover what makes BookStore special
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
              Meet Our Team
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              The people behind BookStore
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center border border-slate-200 dark:border-slate-700"
              >
                <div className="text-6xl mb-3">{member.avatar}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-pink-500 font-semibold text-sm mb-3">
                  {member.role}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Ready to Start Reading?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Join thousands of readers exploring our collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/course" 
                className="btn btn-primary px-8"
              >
                📚 Browse Books
              </Link>
              <Link 
                to="/contact" 
                className="btn btn-outline px-8"
              >
                💬 Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
