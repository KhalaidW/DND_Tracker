// Import libraries
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Setup/Configure
dotenv.config();

// Get Connection String
const connectionStr = process.env.MONGO_URI || "";

// Setup Mongo Client
const client = new MongoClient(connectionStr);

let conn;

try {
  conn = await client.connect();
  console.log("MongoDB Connected...");
} catch (err) {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit if DB connection fails
}

// Choose our database
let db = conn.db("dndCharacters");

// Indexes
await db.collection("characters").createIndex({ name: 1 });

// Export the loaded db module
export default db;