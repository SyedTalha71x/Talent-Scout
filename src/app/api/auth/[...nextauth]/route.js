import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import User from "@/utils/Models/user-model";
import {connectToDB} from "@/utils/db/route";
import { generateToken } from "@/utils/Security/security"

const JWT_SECRET = process.env.JWT_SECRET;

const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            await connectToDB();
            if (account?.provider === "google" || account?.provider === "facebook") {
                try {
                    let existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        existingUser = new User({
                            name: user.name,
                            email: user.email,
                            provider: account.provider,
                            providerId: account.providerAccountId,
                            profileUrl: account.profile?.url,
                            avatarUrl: account.profile?.avatar_url,
                        });
                        await existingUser.save();
                    } else {
                        existingUser.providerId = account.providerAccountId;
                        existingUser.profileUrl = account.profile?.url;
                        existingUser.avatarUrl = account.profile?.avatar_url;
                        existingUser.provider = account.provider;
                        await existingUser.save();
                    }

                    const token = generateToken(existingUser._id, existingUser.email, JWT_SECRET)
                    user.token = token;
                    return true;
                } catch (err) {
                    console.log("Error saving user", err);
                    return false;
                }
            }

            return false;
        },
        async jwt({ token, user }) {
            if (user) {
                token.userId = user._id;
                token.email = user.email;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.userId = token.userId;
                session.email = token.email;
                session.token = token.token;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };