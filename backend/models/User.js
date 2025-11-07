import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }]
});
const User = model('User', UserSchema);

export default User;