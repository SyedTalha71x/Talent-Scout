import mongoose from "mongoose";

let isConnected = false; 

export async function connectToDB() {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        // Only connect if MONGO_DB_URI is set and we're not in the build process
        if (process.env.NODE_ENV === 'production' && !process.env.MONGO_DB_URI) {
            console.log("MongoDB connection URI not found. Skipping connection in production build.");
            return;
        }

        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000,
        });
        
        isConnected = true; 
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("MongoDB connection failed");
    }
}
