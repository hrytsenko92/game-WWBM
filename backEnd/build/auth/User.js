import mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bestScore: { type: Number, require: false, default: 0 },
    prevDataID: { type: [String] },
});
export const User = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map