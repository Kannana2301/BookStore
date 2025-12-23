import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [authUser] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item._id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter((item) => item._id !== bookId));
    toast.success("Removed from cart");
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validation
    if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      toast.error("Please fill all payment fields");
      return;
    }

    if (paymentData.cardNumber.length !== 16) {
      toast.error("Card number must be 16 digits");
      return;
    }

    if (paymentData.cvv.length !== 3) {
      toast.error("CVV must be 3 digits");
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and navigate to success page
      const orderData = {
        items: cartItems,
        subtotal: calculateSubtotal(),
        tax: calculateTax(calculateSubtotal()),
        total: calculateTotal(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        paymentMethod: "Credit Card",
        cardLastFour: paymentData.cardNumber.slice(-4),
        customerName: authUser?.user?.fullname || "Guest",
        customerEmail: authUser?.user?.email || "guest@example.com",
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      localStorage.removeItem("cart");
      setShowPaymentModal(false);
      setCartItems([]);

      toast.success("Payment successful! 🎉");
      setTimeout(() => {
        navigate("/success");
      }, 1000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🛒</span>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
                Shopping Cart
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Review your items and proceed to checkout
            </p>
          </div>

          {cartItems.length === 0 ? (
            // Empty Cart
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="text-6xl mb-4">🛍️</div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Add some books to get started with your order
              </p>
              <Link to="/course">
                <button className="btn bg-pink-500 text-white border-none hover:bg-pink-600">
                  🔍 Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                      {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                    </h2>
                  </div>

                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {cartItems.map((item) => (
                      <div key={item._id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <div className="flex gap-6">
                          {/* Book Image */}
                          <div className="w-20 h-28 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Book Details */}
                          <div className="flex-grow">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {item.title}
                            </p>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              <span>Author: {item.author}</span>
                              <span className="ml-4">Category: {item.category}</span>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col items-end gap-4">
                            <div className="text-right">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Unit Price
                              </p>
                              <p className="text-xl font-bold text-pink-500">
                                ${item.price}
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                                className="text-xl hover:text-pink-500 transition-colors"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                className="text-xl hover:text-pink-500 transition-colors"
                              >
                                +
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Subtotal
                              </p>
                              <p className="text-lg font-bold text-slate-800 dark:text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-500 hover:text-red-700 text-sm font-semibold"
                            >
                              ❌ Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link to="/course">
                    <button className="btn btn-outline w-full">
                      ← Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 sticky top-24 p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Tax (10%)</span>
                      <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between font-bold text-slate-800 dark:text-white text-lg">
                      <span>Total</span>
                      <span className="text-pink-500">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  {cartItems.length > 0 && (
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="btn bg-pink-500 text-white border-none hover:bg-pink-600 w-full"
                    >
                      💳 Proceed to Payment
                    </button>
                  )}

                  {/* Applied Discounts */}
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      💡 Free Books Included
                    </p>
                    <p className="text-xs text-blue-800 dark:text-blue-400">
                      All free books are included in your order at no additional cost
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-6">💳 Payment Details</h3>

            <form onSubmit={handlePayment} className="space-y-4">
              {/* Cardholder Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Cardholder Name</span>
                </label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="John Doe"
                  className="input input-bordered"
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              {/* Card Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Card Number</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="input input-bordered"
                  maxLength="16"
                  inputMode="numeric"
                  value={paymentData.cardNumber.replace(/\s/g, "")}
                  onChange={(e) =>
                    handlePaymentChange({
                      target: {
                        name: "cardNumber",
                        value: e.target.value.replace(/\s/g, "").slice(0, 16),
                      },
                    })
                  }
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Expiry Date</span>
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    className="input input-bordered"
                    maxLength="5"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentChange}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">CVV</span>
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    className="input input-bordered"
                    maxLength="3"
                    inputMode="numeric"
                    value={paymentData.cvv}
                    onChange={(e) =>
                      handlePaymentChange({
                        target: {
                          name: "cvv",
                          value: e.target.value.slice(0, 3),
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 my-6">
                <div className="flex justify-between mb-2">
                  <span>Total Amount:</span>
                  <span className="font-bold text-pink-500 text-lg">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  You will receive an invoice via email
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="btn btn-outline flex-1"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-pink-500 text-white border-none hover:bg-pink-600 flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "✓ Confirm Payment"
                  )}
                </button>
              </div>

              {/* Security Info */}
              <p className="text-xs text-slate-500 text-center">
                🔒 Your payment information is secure and encrypted
              </p>
            </form>
          </div>
        </dialog>
      )}

      <Footer />
    </>
  );
}

export default Cart;
