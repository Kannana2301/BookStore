import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/admin" 
            element={authUser ? <AdminDashboard /> : <Navigate to="/signup" />} 
          />
          <Route 
            path="/wishlist" 
            element={authUser ? <Wishlist /> : <Navigate to="/signup" />} 
          />
          <Route 
            path="/cart" 
            element={authUser ? <Cart /> : <Navigate to="/signup" />} 
          />
          <Route path="/success" element={<Success />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;