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
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            connectTimeoutMS: 30000, // 30 seconds
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
