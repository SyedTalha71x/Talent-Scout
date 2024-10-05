import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

let isConnected = false; 

export async function connectToDB() {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }

    const uri = process.env.MONGO_DB_URI;

    try {
        if (!uri) {
            console.log("MongoDB connection URI not found.");
            return;
        }
        await mongoose.connect(uri);
        isConnected = true; 
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("MongoDB connection failed");
    } 
}
