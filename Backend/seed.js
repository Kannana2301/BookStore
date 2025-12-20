import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";
import booksData from "./data/books.data.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");

    // Clear existing books
    await Book.deleteMany({});
    console.log("Cleared existing books");

    // Insert new books
    await Book.insertMany(booksData);
    console.log(`Successfully seeded ${booksData.length} books to the database`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
