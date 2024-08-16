import connectToDB from "@/utils/db/route";
import User from "@/utils/Models/user-model";
import { NextResponse } from "next/server";
import { hashpassword, generateToken } from "@/utils/Security/security"

export const POST = async (request: any) => {
    try {
        await connectToDB();
        const reqBody = await request.json();
        const { email, password } = reqBody;

        let user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid Email or Password' }, { status: 422 })
        }

        const newPass = hashpassword(password);
        if (user.password !== newPass) {
            return NextResponse.json({ error: 'Invalid Password' }, { status: 422 })
        }

        const jwtToken = generateToken(user._id, user.email, process.env.JWT_SECRET, '1hr')
        return NextResponse.json({
            message: 'Login Successfull',
            data: {
                token: jwtToken
            }
        }, { status: 200 })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}