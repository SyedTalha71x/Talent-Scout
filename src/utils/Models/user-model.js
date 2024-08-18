import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    providerId: { type: String, unique: true, sparse: true }, // For Google or Facebook ID
    profileUrl: { type: String }, // Profile URL from Google or Facebook
    avatarUrl: { type: String }, // Avatar URL from Google or Facebook
    provider: { type: String, default: 'credentials' }, // to indicate 'google' or 'facebook'
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.users || mongoose.model('users', UserSchema);
export default User;
