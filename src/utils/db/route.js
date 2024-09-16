import mongoose from "mongoose";

const MONGODB_KEY = 'mongodb://localhost:27017/DevTalent';

export async function connectToDB() {
    try{
        await mongoose.connect(MONGODB_KEY);
        console.log("Connected with MongoDB Successfull")

    }
    catch(error){
        console.log("Failed to connect with mongodb", error);
    }
    
}