import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import { seedDatabase } from "./seed.js";
import routes from "./routes.js";

const app = express();
const PORT =Number(process.env.PORT) || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Routes
app.use(routes);

// Health check
app.get("/", (req , res ) => {
  res.send("✅ BookIt API is running...");
});

// Initialize database and start server
async function startServer() {
  try {
    await connectDB();
    await seedDatabase();
    
    app.listen(PORT , '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
