import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";

export const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const [authUser] = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

  useEffect(() => {
    // Only connect if user is authenticated and has a token
    if (authUser && authUser.token) {
      console.log("Attempting to connect socket with token:", authUser.token ? "Present" : "Missing");
      const newSocket = io(API_URL, {
        auth: {
          token: authUser.token,
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        transports: ['websocket', 'polling'],
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        setConnected(true);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
        setConnected(false);
      });

      newSocket.on("activeUsers", (count) => {
        setActiveUsers(count);
      });

      // Listen for new book notifications
      newSocket.on("newBook", (data) => {
        console.log("🎉 NEW BOOK NOTIFICATION RECEIVED:", data);
        const message = `📚 New Book: ${data.book.name || data.book.title} by ${data.addedBy}`;
        console.log("Showing toast:", message);
        toast.success(message, {
          duration: 8000,
          position: "top-center",
          icon: "🎉",
          style: {
            background: '#10B981',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.5)',
          },
        });
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        setConnected(false);
      });

      setSocket(newSocket);

      return () => {
        console.log("Cleaning up socket connection");
        newSocket.close();
      };
    } else {
      console.log("No authUser or token, socket will not connect");
      // If user logs out, disconnect socket
      if (socket) {
        socket.close();
        setSocket(null);
        setConnected(false);
      }
    }
  }, [authUser]);

  const value = {
    socket,
    connected,
    activeUsers,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
      {authUser && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="px-3 py-1 rounded-full border text-sm bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-100">
            {connected ? `Live • ${activeUsers} online` : 'Connecting...'}
          </div>
        </div>
      )}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
