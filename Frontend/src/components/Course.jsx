import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import BookDetails from "./BookDetails";
import { useSocket } from "../context/SocketProvider";

function Course() {
  const [book, setBook] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const { socket } = useSocket();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

  const categories = ["All", "Free", "Programming", "Web Development", "Data Science", "Business", "Design", "Cybersecurity"];

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/book`);
      setBook(res.data);
      setFilteredBooks(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Listen for new book events
  useEffect(() => {
    if (socket) {
      socket.on("newBook", () => {
        // Refresh book list when new book is added
        fetchBooks();
      });

      return () => {
        socket.off("newBook");
      };
    }
  }, [socket]);

  useEffect(() => {
    let filtered = book;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [book, selectedCategory, searchQuery]);

  const handleViewDetails = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Header Section */}
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Explore Our{" "}
            <span className="text-pink-500">Book Collection</span>
          </h1>
          <p className="mt-6 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover a world of knowledge with our extensive collection of books spanning programming, 
            web development, data science, business, design, and cybersecurity. Find your next favorite read!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 duration-300">
              ← Back to Home
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-xl">
            <input
              type="text"
              placeholder="Search by book name, title, or author..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn ${
                selectedCategory === category
                  ? "bg-pink-500 text-white border-none"
                  : "btn-outline"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center mt-12">
            <span className="loading loading-spinner loading-lg text-pink-500"></span>
          </div>
        )}

        {/* Books Grid */}
        {!loading && filteredBooks.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((item) => (
              <Cards key={item._id} item={item} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredBooks.length === 0 && (
          <div className="text-center mt-12 mb-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2">No books found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetails book={selectedBook} onClose={handleCloseDetails} />
      )}
    </>
  );
}

export default Course;
