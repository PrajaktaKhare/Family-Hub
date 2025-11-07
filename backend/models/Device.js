import mongoose, {model} from 'mongoose';

const Schema = mongoose.Schema;


const deviceSchema = new Schema({
     id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    os: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    installedApps: [{
        type: Schema.Types.ObjectId,
        ref: 'App'
    }],
    lastSync: {
        type: Date,
        default: Date.now
    }
});

const Device = model('Device', deviceSchema);

export default Device;