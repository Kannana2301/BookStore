import React from "react";
import toast from "react-hot-toast";

function BookDetails({ book, onClose }) {
  if (!book) return null;

  const addToCart = () => {
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
    toast.success("Added to cart! 🛒");
  };

  const addToWishlist = () => {
    // Get existing wishlist or create empty array
    const savedWishlist = localStorage.getItem("wishlist");
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

    // Check if book already in wishlist
    const existingItem = wishlist.find((w) => w._id === book._id);

    if (existingItem) {
      toast.success("Already in wishlist!");
      return;
    }

    wishlist.push(book);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("Added to wishlist! ❤️");
  };

  return (
    <dialog id="book_details_modal" className="modal" open>
      <div className="modal-box max-w-4xl">
        <form method="dialog">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Image */}
          <div className="md:w-1/3">
            <img
              src={book.image}
              alt={book.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Book Details */}
          <div className="md:w-2/3">
            <div className="badge badge-secondary mb-2">{book.category}</div>
            <h2 className="text-3xl font-bold mb-2">{book.name}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              {book.title}
            </p>

            {/* Author and Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-slate-700 dark:text-slate-300">
                <strong>Author:</strong> {book.author}
              </span>
              <span className="text-yellow-500 text-lg">
                ★ {book.rating}/5
              </span>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-slate-600 dark:text-slate-400">Pages:</span>
                <p className="font-semibold">{book.pages}</p>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Language:</span>
                <p className="font-semibold">{book.language}</p>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Publisher:</span>
                <p className="font-semibold">{book.publisher}</p>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Price:</span>
                <p className="font-semibold text-pink-500 text-xl">
                  {book.price === 0 ? "FREE" : `$${book.price}`}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">About this book</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={addToCart}
                className="btn bg-pink-500 text-white border-none hover:bg-pink-600 flex-1"
              >
                {book.price === 0 ? "📖 Read Now" : `💳 Buy for $${book.price}`}
              </button>
              <button 
                onClick={addToWishlist}
                className="btn btn-outline flex-1"
              >
                ❤️ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default BookDetails;
