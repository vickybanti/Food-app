import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionToken: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expires: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);