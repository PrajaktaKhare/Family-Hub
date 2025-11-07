import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const DeviceStatusSchema = new Schema({
    device: {
        type: Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'installed', 'installing', 'failed'],
        default:'pending'
    }
});

const installReqSchema = new Schema({
    app: {
        type: Schema.Types.ObjectId, 
        ref: 'App',
        required: true
    },
    devices:[DeviceStatusSchema],
    requestedAt: {
        type: Date, 
        default: Date.now
    },
    completedAt: Date
})

const installReq = mongoose.model('installReq', installReqSchema);

export default installReq;          