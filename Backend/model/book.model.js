import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    author: { type: String, default: "Unknown" },
    pages: { type: Number, default: 0 },
    language: { type: String, default: "English" },
    publisher: { type: String, default: "" },
    rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

export default Book;