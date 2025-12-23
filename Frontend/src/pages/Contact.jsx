  
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Contact() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent — we'll get back within 24 hours.", { duration: 3500 });
      reset();
      setLoading(false);
    }, 900);
  };

  const contactMethods = [
    { icon: "📧", title: "Email", detail: "support@bookstore.com" },
    { icon: "📱", title: "Phone", detail: "9888224668" },
    { icon: "💬", title: "Live Chat", detail: "Available" },
    { icon: "📍", title: "Visit", detail: "CHITKARA" },
  ];

  const faqs = [
    { question: "How do I create an account?", answer: "Use the Sign Up page to register an account." },
    { question: "Are the books free?", answer: "We have both free and paid books; check the category list." },
    { question: "Can I download books?", answer: "Download support is planned for a future release." },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Contact Us</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Questions, feedback, or suggestions — we’re here to help.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {contactMethods.map((m, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{m.icon}</div>
                <div className="font-semibold text-slate-800 dark:text-white">{m.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{m.detail}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="text" placeholder="Your name" className="input input-bordered w-full" {...register("name", { required: true })} />
                {errors.name && <div className="text-xs text-red-600">Name is required</div>}

                <input type="email" placeholder="Email" className="input input-bordered w-full" {...register("email", { required: true })} />
                {errors.email && <div className="text-xs text-red-600">Valid email is required</div>}

                <select className="select select-bordered w-full" {...register("subject", { required: true })}>
                  <option value="">Choose subject</option>
                  <option value="support">Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <div className="text-xs text-red-600">Please select a subject</div>}

                <textarea placeholder="Message" className="textarea textarea-bordered w-full h-28" {...register("message", { required: true, minLength: 10 })} />
                {errors.message && <div className="text-xs text-red-600">Message must be at least 10 characters</div>}

                <button type="submit" className="btn w-full bg-slate-800 text-white" disabled={loading}>
                  {loading ? "Sending…" : "Send Message"}
                </button>
                <p className="text-xs text-slate-500 mt-2">We respect your privacy. Your information will not be shared.</p>
              </form>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Frequently Asked</h2>
                <div className="space-y-3">
                  {faqs.map((f, i) => (
                    <details key={i} className="p-3 bg-slate-50 dark:bg-slate-700 rounded">
                      <summary className="font-medium">{f.question}</summary>
                      <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/course" className="text-slate-700 dark:text-slate-200">Browse Books</a></li>
                  <li><a href="/about" className="text-slate-700 dark:text-slate-200">About Us</a></li>
                  <li><a href="/signup" className="text-slate-700 dark:text-slate-200">Create Account</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Follow us</p>
            <div className="flex justify-center gap-3">
              <a className="p-3 border rounded text-slate-700 dark:text-slate-200" href="#">📘</a>
              <a className="p-3 border rounded text-slate-700 dark:text-slate-200" href="#">📷</a>
              <a className="p-3 border rounded text-slate-700 dark:text-slate-200" href="#">🐦</a>
              <a className="p-3 border rounded text-slate-700 dark:text-slate-200" href="#">💬</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
