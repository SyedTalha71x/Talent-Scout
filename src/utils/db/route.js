// utils/db/connection.js
import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Connected with MongoDB Successfully");
    } catch (error) {
        console.error("Failed to connect with MongoDB", error);
        throw new Error("Failed to connect with MongoDB");
    }
}
