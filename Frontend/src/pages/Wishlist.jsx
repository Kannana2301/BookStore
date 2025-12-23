import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const removeFromWishlist = (bookId) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== bookId));
    toast.success("Removed from wishlist");
  };

  const addToCart = (book) => {
    // Get existing cart or create empty array
    const savedCart = localStorage.getItem("cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];

    // Check if book already in cart
    const existingItem = cart.find((item) => item._id === book._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...book,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart!");
    removeFromWishlist(book._id);
  };

  const moveAllToCart = () => {
    wishlistItems.forEach((book) => {
      addToCart(book);
    });
    setWishlistItems([]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">❤️</span>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
                My Wishlist
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Save your favorite books and purchase them later
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            // Empty Wishlist
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Start adding books to your wishlist to save them for later
              </p>
              <Link to="/course">
                <button className="btn bg-pink-500 text-white border-none hover:bg-pink-600">
                  🔍 Browse Books
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Action Bar */}
              <div className="mb-6 flex gap-4 flex-wrap justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "book" : "books"} in your wishlist
                </p>
                {wishlistItems.length > 0 && (
                  <button
                    onClick={moveAllToCart}
                    className="btn bg-pink-500 text-white border-none hover:bg-pink-600"
                  >
                    🛒 Move All to Cart
                  </button>
                )}
              </div>

              {/* Wishlist Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-xl transition-shadow duration-200 border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
                  >
                    {/* Book Image */}
                    <div className="h-64 overflow-hidden bg-slate-100 dark:bg-slate-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Book Info */}
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="badge badge-secondary mb-2">
                        {item.category}
                      </div>

                      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">
                        {item.name}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                        {item.title}
                      </p>

                      {/* Author and Rating */}
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <span className="text-slate-600 dark:text-slate-400">
                          🖊️ {item.author}
                        </span>
                        <span className="ml-auto text-yellow-500 font-semibold">
                          ★ {item.rating}
                        </span>
                      </div>

                      {/* Price and Actions */}
                      <div className="mt-auto border-t border-slate-200 dark:border-slate-700 pt-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-pink-500">
                            {item.price === 0 ? "FREE" : `$${item.price}`}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => addToCart(item)}
                            className="flex-1 btn btn-sm bg-pink-500 text-white border-none hover:bg-pink-600"
                          >
                            🛒 Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="flex-1 btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            ❌ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8 text-center">
                <Link to="/course">
                  <button className="btn btn-outline px-8">
                    ← Continue Shopping
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
