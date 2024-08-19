import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const dbname = process.env.MONGODB_DB;

const MONGODB_URL = `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`;

async function connectToDB() {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            connectTimeoutMS: 10000, // Timeout after 10 seconds for initial connection
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);

        if (error.name === "MongoServerSelectionError") {
            console.error(
                "MongoDB server selection timed out. Please check your connection string and ensure the server is reachable."
            );
        }

        throw error; // Re-throw the error after logging
    }
}

export default connectToDB;
