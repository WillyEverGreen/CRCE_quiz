import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { registerHostHandlers } from "./socketHandlers/hostHandlers.js";
import { registerPlayerHandlers } from "./socketHandlers/playerHandlers.js";
import quizRoutes from "./routes/quiz.js";
import * as gm from "./gameManager.js";

const app = express();
const server = http.createServer(app);

// Track connection stats
let totalConnections = 0;
let peakConnections = 0;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ["websocket", "polling"],
  // Optimize for high connections
  maxHttpBufferSize: 1e6, // 1MB max message size
  connectTimeout: 45000,
});

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/health", (_, res) => res.json({ status: "ok" }));

// Server statistics endpoint for monitoring
app.get("/stats", (_, res) => {
  const stats = gm.getServerStats();
  const memUsage = process.memoryUsage();
  res.json({
    ...stats,
    totalConnectionsEver: totalConnections,
    peakConnections,
    currentConnections: io.engine.clientsCount,
    memory: {
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + "MB",
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + "MB",
      rss: Math.round(memUsage.rss / 1024 / 1024) + "MB",
    },
    uptime: Math.round(process.uptime()) + "s",
  });
});

// Quiz routes
app.use("/api/quizzes", quizRoutes);

// Socket.IO connection
io.on("connection", (socket) => {
  totalConnections++;
  const currentCount = io.engine.clientsCount;
  if (currentCount > peakConnections) {
    peakConnections = currentCount;
  }

  console.log(`Client connected: ${socket.id} (${currentCount} active)`);

  registerHostHandlers(io, socket);
  registerPlayerHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id} (${io.engine.clientsCount} active)`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
