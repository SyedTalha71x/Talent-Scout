import { MongoClient, ServerApiVersion } from 'mongodb';
import { configDotenv } from 'dotenv';
configDotenv();

let isConnected = false; 

export async function connectToDB() {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }

    const uri = process.env.MONGO_DB_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        // Only connect if MONGO_DB_URI is set and we're not in the build process
        if (process.env.NODE_ENV === 'production' && !process.env.MONGO_DB_URI) {
            console.log("MongoDB connection URI not found. Skipping connection in production build.");
            return;
        }

        await client.connect();
        
        await client.db("admin").command({ ping: 1 });
        
        isConnected = true; 
        console.log("Connected to MongoDB successfully!");

        return client; // Return the client if you want to use it later
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("MongoDB connection failed");
    } 
}
