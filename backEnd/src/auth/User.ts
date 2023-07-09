import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string;
    password: string;
    bestScore: number;
    prevDataID: [],
}

export const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bestScore: { type: Number, require: false, default: '0' },
    prevDataID: [{ type: String }],
});

export const User = mongoose.model<IUser>('User', UserSchema);