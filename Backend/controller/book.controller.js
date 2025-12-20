import Book from "../model/book.model.js";
import { io } from "../index.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const addBook = async(req, res) => {
    try {
        const { name, title, price, category, image, description, author, pages, language, publisher, rating } = req.body;
        
        const newBook = new Book({
            name,
            title,
            price,
            category,
            image,
            description,
            author,
            pages,
            language,
            publisher,
            rating,
        });

        await newBook.save();

        // Broadcast to all connected users via WebSocket
        const notificationData = {
            book: newBook,
            message: `New book added: ${newBook.name || newBook.title}`,
            addedBy: req.user.fullname,
        };
        
        console.log("📢 Broadcasting newBook event:", notificationData);
        
        if (io) {
            io.emit("newBook", notificationData);
            console.log("✅ Broadcast successful");
        } else {
            console.error("❌ Socket.IO instance not available");
        }

        res.status(201).json({
            message: "Book added successfully",
            book: newBook,
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Failed to add book", error: error.message });
    }
};