import React from "react";
import toast from "react-hot-toast";

function Cards({ item, onViewDetails }) {
  const addToWishlist = (book) => {
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
    toast.success("Added to cart! 🛒");
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border h-full flex flex-col">
          <figure className="h-64 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex-grow">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{item.title}</p>
            
            {/* Author and Rating */}
            <div className="flex items-center gap-2 text-sm mt-2">
              <span className="text-slate-600 dark:text-slate-400">🖊️ {item.author}</span>
              <span className="ml-auto text-yellow-500">★ {item.rating}</span>
            </div>
            
            <div className="card-actions justify-between items-center mt-4">
              <div className="text-xl font-bold text-pink-500">
                {item.price === 0 ? "FREE" : `$${item.price}`}
              </div>
              <div className="flex gap-2">
                {onViewDetails && (
                  <button 
                    onClick={() => onViewDetails(item)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Details
                  </button>
                )}
                <button 
                  onClick={() => addToWishlist(item)}
                  className="btn btn-sm btn-ghost hover:bg-pink-100 dark:hover:bg-pink-900"
                  title="Add to Wishlist"
                >
                  ❤️
                </button>
                <button 
                  onClick={() => addToCart(item)}
                  className="btn btn-sm bg-pink-500 text-white border-none hover:bg-pink-600"
                >
                  {item.price === 0 ? "Read Now" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
