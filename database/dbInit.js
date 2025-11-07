import mongoose from 'mongoose';
import dotenv from 'dotenv';
import App from '../backend/models/App.js';
import User from '../backend/models/User.js'

dotenv.config();
console.log(process.env.DB_URL);

export const connectToDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            dbName: 'familyhub'
        });
        console.log("Mongoose Connected..");
 
    }catch(error){
        console.log('Mongoose connection failed ' + error);
        
    }
    
}


export async function feedAppsInDatabase() {
    try{

        const count = await App.countDocuments();
        if(count == 0){
            const initialApps = [
                {name: 'Youtube', packageId: 'com.google.youtube', category: 'Entertainment'},
                {name: 'Goibibo', packageId: 'com.goibibo', category: 'Travel'},
                {name: 'Udemy', packageId: 'com.udemy', category: 'Education'},
                {name: 'Blackboard', packageId: 'com.blackboard', category: 'Education'},
                {name: 'Spotify', packageId: 'com.spotify', category: 'Music'},
                {name: 'Zoom', packageId: 'com.zoom', category: 'Communication'},
                {name: 'Dropbox', packageId: 'com.dropbox', category: 'storage' }
                
            ];
            await App.insertMany(initialApps);
            console.log("inserted apps to database");
            
        }else{
            console.log("Apps already inserted");
            
        }
    }catch(err){
        console.log(err);
        
    }
}

export async function feedUsers() {
    try{
        const count = await User.countDocuments();
        if(count == 0){
            const initialUsers = [
                {name: 'John Doe', email: 'john@fh.com', password: '123456', role:'Admin'},
                {name: 'Mary Jones', email: 'mary@fh.com', password: '123456', role:'User'},

            ];
            await User.insertMany(initialUsers);
            console.log("Inserted initial users");
            
        }
    }catch(err){
        console.error("error feeding users to db.. "+err);
        
    }
}