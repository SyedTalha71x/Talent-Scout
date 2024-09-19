import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    providerId: { type: String, unique: true, sparse: true },
    profileUrl: { type: String },
    avatarUrl: { type: String },
    provider: { type: String, default: 'credentials' }, 
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.users || mongoose.model('users', UserSchema);
export default User;
