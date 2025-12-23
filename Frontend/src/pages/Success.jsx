import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";

function Success() {
  const [orderData, setOrderData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Load order data from localStorage
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      try {
        setOrderData(JSON.parse(savedOrder));
      } catch (error) {
        console.error("Error loading order data:", error);
      }
    }
  }, []);

  const generatePDF = async () => {
    if (!orderData) {
      toast.error("No order data available");
      return;
    }

    setDownloading(true);

    try {
      const element = document.getElementById("invoice");

      const options = {
        margin: 10,
        filename: `invoice-${new Date().getTime()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      };

      html2pdf().set(options).from(element).save();

      toast.success("PDF downloaded successfully! 📄");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  if (!orderData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-12 px-4 mt-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Loading order details...
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we retrieve your order information.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="text-7xl animate-bounce">✨</div>
            </div>
            <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3">
              Payment Successful!
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
              Thank you for your purchase
            </p>
            <p className="text-slate-500 dark:text-slate-300">
              Order ID: #ORD-{new Date().getTime()}
            </p>
          </div>

          {/* Confirmation Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <h2 className="font-bold text-slate-800 dark:text-white text-lg">
                  Your order has been confirmed!
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  A confirmation email has been sent to {orderData.customerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Section */}
          <div
            id="invoice"
            className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Invoice Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">📚 BookStore</h1>
                  <p className="text-pink-100 mt-2">Your trusted online bookstore</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-pink-100">INVOICE</p>
                  <p className="text-2xl font-bold">Receipt</p>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="p-8">
              {/* Customer and Order Info */}
              <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-3">
                    Bill To
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {orderData.customerName}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {orderData.customerEmail}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
                    Card ending in: •••• {orderData.cardLastFour}
                  </p>
                </div>

                <div className="text-right">
                  <h3 className="font-bold text-slate-800 dark:text-white mb-3">
                    Order Details
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>Date:</strong> {orderData.date}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>Time:</strong> {orderData.time}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>Payment:</strong> {orderData.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">
                  Order Items
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300 font-semibold">
                          Book
                        </th>
                        <th className="px-4 py-3 text-center text-slate-700 dark:text-slate-300 font-semibold">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-right text-slate-700 dark:text-slate-300 font-semibold">
                          Price
                        </th>
                        <th className="px-4 py-3 text-right text-slate-700 dark:text-slate-300 font-semibold">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-t border-slate-200 dark:border-slate-700">
                      {orderData.items.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-semibold text-slate-800 dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.author}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-800 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="flex justify-end mb-8">
                <div className="w-full sm:w-80">
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Subtotal:</span>
                      <span>${orderData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Shipping:</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Tax (10%):</span>
                      <span>${orderData.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-300 dark:border-slate-600 pt-3 flex justify-between font-bold text-lg">
                      <span className="text-slate-800 dark:text-white">
                        Total:
                      </span>
                      <span className="text-pink-500 text-xl">
                        ${orderData.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                <p>🙏 Thank you for shopping with BookStore!</p>
                <p className="mt-2">
                  For support, contact: support@bookstore.com | Phone: +1-800-BOOKS-01
                </p>
                <p className="mt-4 text-xs">
                  This invoice was generated automatically. Please keep it for your records.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={generatePDF}
              disabled={downloading}
              className="btn bg-blue-500 text-white border-none hover:bg-blue-600 px-8"
            >
              {downloading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Downloading...
                </>
              ) : (
                "📥 Download PDF Invoice"
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="btn btn-outline px-8"
            >
              🖨️ Print Invoice
            </button>

            <Link to="/course">
              <button className="btn bg-pink-500 text-white border-none hover:bg-pink-600 px-8">
                📚 Continue Shopping
              </button>
            </Link>
          </div>

          {/* Order Status Timeline */}
          <div className="mt-12 bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-8">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-6">
              What's Next?
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    Payment Confirmed
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your payment has been successfully processed
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    Confirmation Email
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Check your email for order confirmation and invoice
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    Access Your Books
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    You can now access all your purchased books in your library
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    Enjoy Reading!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Start reading your new books and explore great content
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Success;
