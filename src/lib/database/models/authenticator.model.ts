
import mongoose from 'mongoose';

const authenticatorSchema = new mongoose.Schema({
    credentialID: {type: String, unique: true, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    providerAccountId: {type: String, required: true},
    credentialPublicKey: {type: String, required: true},
    counter: {type: Number, required: true},
    credentialDeviceType: {type: String, required: true},
    credentialBackedUp: {type: Boolean, required: true},
    transports: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
}, {timestamps: true});


export default mongoose.model('Authenticator', authenticatorSchema);