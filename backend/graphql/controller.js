import user from '../models/User.js'
import devices from '../models/Device.js'
import apps from '../models/App.js'
import installReq from '../models/InstallRequests.js'



export const getAllApps = async () =>{
    try{
        const result = await apps.find();
        return result;
    }catch(err){
        console.log("Error finding apps "+ err);
        
    }
}

export const getInstalledApps = async(device_id) =>{
    console.log("installedAppId: "+device_id);
    
    try{
        const apps = await devices.findById(device_id).populate('installedApps').lean();
        console.log(apps);
        
        return apps;


    }catch(err){
        console.log("Eror loading installed apps "+ err);
        
    }
}

export const getDevice  = async (userId) =>{
    try{
        const result = await devices.find({owner: userId}).populate('installedApps');
        console.log("get device "+ result);
        
        return result;
    }catch(err){
        console.log("error in finding devices.. "+ err);
        

    }
};
//C:\Users\praja\OneDrive\Desktop\BU\CS 602\Project\FamilyHub\database