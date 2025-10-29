const express = require("express");
const http = require("http");
const { createClient } = require("redis");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"]
  }
});

const redisClient = createClient();

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Connected to local Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err.message);
    process.exit(1); // Exit if Redis connection fails, as it's critical
  }
}
connectRedis();

const subscriber = redisClient.duplicate();
subscriber.connect().then(() => {
  console.log("Redis subscriber connected.");
  // Subscribe to the 'notifications' channel
  subscriber.subscribe("notifications", (message) => {
    console.log("Received notification from Redis:", message);
    // Emit the message to all connected Socket.IO clients
    io.emit("notification", message);
  });
}).catch(err => {
  console.error("Failed to connect Redis subscriber:", err.message);
});

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendNotification", async (data) => {
    console.log(`Publishing notification: "${data.message}"`);
    await redisClient.publish("notifications", data.message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
