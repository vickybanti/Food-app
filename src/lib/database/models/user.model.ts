import mongoose, { model , models } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  emailVerified: Date,
  image: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  accounts: { type: Array },
  sessions: { type: Array },
  authenticator: { type: Array },
  order: { type: Array },
},
 { timestamps: true },

);
const User = models.User || model('User', userSchema)


export default User;