import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./utils/socket.util.js";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

if (!URI) {
    console.error("Missing MongoDBURI environment variable. Please set MongoDBURI in your .env or environment.");
    process.exit(1);
}

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

// exportable io reference (will be assigned after socket initialization)
export let io;

// Start server after DB connection
const startServer = async () => {
    try {
        // await the connection so errors are caught here instead of buffering later
        await mongoose.connect(URI);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // exit so the problem is visible and the process manager (nodemon) can restart if desired
        process.exit(1);
    }

    // Initialize Socket.IO and export io
    io = initializeSocket(httpServer);
    console.log("Socket.IO initialized");

    // defining routes
    app.use("/book", bookRoute);
    app.use("/user", userRoute);

    httpServer.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

startServer();