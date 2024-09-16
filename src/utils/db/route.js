import mongoose from "mongoose";

export async function connectToDB() {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected with MongoDB Successfull")

    }
    catch(error){
        console.log("Failed to connect with mongodb", error);
    }
    
}