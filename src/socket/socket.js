import { io } from "socket.io-client";

let socket = null;

/* ================= BACKEND URL ================= */

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

/* ================= CONNECT ================= */

export const connectSocket = (token) => {
  if (!token) {
    console.log("⚠️ No token provided to socket");
    return null;
  }

  // If already connected with same token, reuse
  if (socket && socket.connected) {
    return socket;
  }

  // If socket exists but disconnected, destroy it first
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(BACKEND_URL, {
    auth: { token },
    withCredentials: true,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.log("❌ Socket connection error:", err.message);
  });

  return socket;
};

/* ================= GET SOCKET ================= */

export const getSocket = () => socket;

/* ================= DISCONNECT ================= */

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
