import mongoose from 'mongoose';
const Schema = mongoose.Schema;

console.log("In app database....");

const appSchema = new Schema({
    name: String,
    packageId:{
        type: String,
        unique: true
    },
    category: String,
    devices:[{
        type: Schema.Types.ObjectId,
        ref:'Device'
    }]
});

const App = mongoose.model('App', appSchema);

export default App;