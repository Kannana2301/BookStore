import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Redirect if not admin
  React.useEffect(() => {
    if (!authUser || !authUser.user.isAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [authUser, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    const bookData = {
      name: data.name,
      title: data.title,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
      description: data.description,
      author: data.author,
      pages: parseInt(data.pages),
      language: data.language,
      publisher: data.publisher,
      rating: parseFloat(data.rating),
    };

    try {
      const response = await axios.post(
        `${API_URL}/book`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      if (response.data) {
        toast.success("✅ Book added! All users will be notified.", {
          duration: 4000,
          icon: "📚",
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(
        error.response?.data?.message || "Failed to add book"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!authUser || !authUser.user.isAdmin) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 mt-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">👑</span>
              <span className="text-sm font-semibold text-pink-500 uppercase tracking-wide">Admin Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
              Add New Book
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Add books to the store and notify all users in real-time
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📚</span>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Books</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">23+</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏷️</span>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Categories</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">7</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Book Information</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Fill in the details below</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Book Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Learn JavaScript"
                        className="input input-bordered w-full"
                        {...register("name", { required: "Book name is required" })}
                      />
                      {errors.name && (
                        <span className="text-error text-sm mt-1">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Title *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., JavaScript: The Complete Guide"
                        className="input input-bordered w-full"
                        {...register("title", { required: "Title is required" })}
                      />
                      {errors.title && (
                        <span className="text-error text-sm mt-1">{errors.title.message}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category & Pricing */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Category & Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Category *</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        {...register("category", { required: "Category is required" })}
                      >
                        <option value="">Select Category</option>
                        <option value="Free">Free</option>
                        <option value="Programming">Programming</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                      </select>
                      {errors.category && (
                        <span className="text-error text-sm mt-1">{errors.category.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Price *</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00 (0 for free)"
                        className="input input-bordered w-full"
                        {...register("price", { 
                          required: "Price is required",
                          min: { value: 0, message: "Price must be positive" }
                        })}
                      />
                      {errors.price && (
                        <span className="text-error text-sm mt-1">{errors.price.message}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Author & Publisher */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Author & Publisher</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Author *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., John Doe"
                        className="input input-bordered w-full"
                        {...register("author", { required: "Author is required" })}
                      />
                      {errors.author && (
                        <span className="text-error text-sm mt-1">{errors.author.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Publisher *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Tech Publishing"
                        className="input input-bordered w-full"
                        {...register("publisher", { required: "Publisher is required" })}
                      />
                      {errors.publisher && (
                        <span className="text-error text-sm mt-1">{errors.publisher.message}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Book Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Pages *</span>
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 350"
                        className="input input-bordered w-full"
                        {...register("pages", { 
                          required: "Page count is required",
                          min: { value: 1, message: "Must be at least 1 page" }
                        })}
                      />
                      {errors.pages && (
                        <span className="text-error text-sm mt-1">{errors.pages.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Language *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., English"
                        className="input input-bordered w-full"
                        {...register("language", { required: "Language is required" })}
                      />
                      {errors.language && (
                        <span className="text-error text-sm mt-1">{errors.language.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Rating *</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 4.5"
                        className="input input-bordered w-full"
                        {...register("rating", { 
                          required: "Rating is required",
                          min: { value: 0, message: "Rating must be 0-5" },
                          max: { value: 5, message: "Rating must be 0-5" }
                        })}
                      />
                      {errors.rating && (
                        <span className="text-error text-sm mt-1">{errors.rating.message}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Book Cover</h3>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Image URL *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/book-cover.jpg"
                      className="input input-bordered w-full"
                      {...register("image", { required: "Image URL is required" })}
                    />
                    {errors.image && (
                      <span className="text-error text-sm mt-1">{errors.image.message}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Description</h3>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Description *</span>
                    </label>
                    <textarea
                      placeholder="Write a detailed description of the book..."
                      className="textarea textarea-bordered w-full h-32"
                      {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                      <span className="text-error text-sm mt-1">{errors.description.message}</span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>📚 Add Book & Notify Users</>
                    )}
                  </button>
                  <Link to="/" className="btn btn-outline">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Real-time Notifications</h4>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  When you add a book, all active users will instantly receive a notification via WebSocket. 
                  Make sure all fields are accurate before submitting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
