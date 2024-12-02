import mongoose, { model , models } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  emailVerified: Date,
  firstName: String,
  lastName: String,
  password: String,
  image: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  accounts: { type: Array },
  sessions: { type: Array },
  authenticator: { type: Array },
  order: { type: Array },
  intentId: { type: String },
  city:{type: String, required:true },
  street:{type: String, required:true },
  country:{ type: String , required:true},
  phoneNumber:{type: String, required:true},

},
 { timestamps: true },

);
const User = models.User || model('User', userSchema)


export default User;