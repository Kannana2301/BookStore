import { Server } from "socket.io";
import { verifyToken } from "./jwt.util.js";

let io;
const activeUsers = new Map(); // Map to store userId -> socketId

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Middleware to authenticate WebSocket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return next(new Error("Authentication error: Invalid token"));
    }

    socket.userId = decoded.userId;
    socket.userEmail = decoded.email;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userEmail} (${socket.id})`);
    
    // Store active user
    activeUsers.set(socket.userId, socket.id);
    
    // Emit to all clients the updated user count
    io.emit("activeUsers", activeUsers.size);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userEmail}`);
      activeUsers.delete(socket.userId);
      io.emit("activeUsers", activeUsers.size);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const emitToUser = (userId, event, data) => {
  const socketId = activeUsers.get(userId);
  if (socketId && io) {
    io.to(socketId).emit(event, data);
  }
};

export default { initializeSocket, getIO, emitToUser };
