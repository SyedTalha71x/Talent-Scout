import connectToDB from "@/utils/db/route";
import User from "@/utils/Models/user-model";
import crypto from 'crypto-js';
import { NextResponse } from "next/server";
import { hashpassword } from "@/utils/Security/security"

export const POST = async (request: any) => {
    let db: any;
    try {
        db = await connectToDB();
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        let users = await User.findOne({ email });

        if (users) {
            return NextResponse.json('Email is already in use', { status: 422 });
        }

        const newPass = hashpassword(password);

        users = new User({
            name, email, password: newPass
        })
        await users.save();
        return NextResponse.json({
            message: 'User is Signup Successfully', data: { users }
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating user:", error);
        if (error.name === 'MongoServerSelectionError') {
            return NextResponse.json('Database connection failed. Please try again later.', { status: 503 });
        }
        return NextResponse.json('Internal Server Error', { status: 500 });
    } finally {
        if (db) {
            await db.client.close();
        }
    }
};