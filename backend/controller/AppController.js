import App from '../models/App.js'
import InstallRequest from '../models/InstallRequests.js'
import Devices from '../models/Device.js'
import mongoose from 'mongoose';

export const getAllApps = async (req, res, next) => {
    try {
        const apps = await App.find().lean();
        //  code for JSON, and HTML formats
        res.format({
            'application/json': () => {
                res.json(apps);
            },
            'text/html': () => {
                //console.log("Apps to render:", apps);

                res.render('apps', { apps })
            }
        })

    } catch (err) {
        console.log("Error finding apps " + err);

    }

}

export const showInstallForm = async (req, res, next) => {

    try {
        const apps = await App.find().lean();
        const devices = await Devices.find().lean().populate('owner', 'name');  // optionally filter by user if needed

        res.render('install', { apps, devices });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load install form');
    }
}


export const createInstallRequest = async (req, res, next) => {
    const appName = await App.findOne({ name: req.body.app });

    let devices = req.body.devices;

    // If it's not already an array, wrap it in one
    if (!Array.isArray(devices)) {
        devices = [devices];
    }
    // Check that each device exists
    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
    const validDeviceIds = devices.filter(id => isValidObjectId(id));
    console.log(validDeviceIds+" validDeviceIds ids==> ");
    
    const foundDevices = await Devices.find({ _id: { $in: validDeviceIds } });
    if (foundDevices.length !== devices.length) {
        const foundIds = foundDevices.map(d => d._id.toString());
        
        console.log(foundDevices+" found ids==> "+foundIds);
        
        const missing = devices.filter(id => !foundIds.includes(id));
        return res.status(404).json({
            error: "Some devices not found.Please input valid devices",
            missingDevices: missing
        });
    }


    if (appName) {
        console.log("App present in store.... " + appName);
        try {
            const installReq = await InstallRequest.create({
                app: appName._id,
                devices: foundDevices.map(d => ({
                    device: d._id,
                    status: "pending"
                }))
            });
            res.format({
                'application/json': () => {
                    res.status(201).json(installReq);

                },
                'text/html': () => {
                    console.log("Apps installed");
                    res.render('dashboard', { message: "App installing.." });


                }
            })


            //start installation in background
            simulateInstallation(installReq);

        } catch (err) {
            console.log("Error installing apps " + err);
        }
    } else {
        console.log("App not found");

    }

}

const simulateInstallation = async (installationReq) => {
    try {
        const req = await InstallRequest.findById(installationReq._id).populate('devices.device');
        console.log("req=> ", req);

        if (!req) {
            console.log("Install req not found");
            return;
        }

        for (let deviceStatus of req.devices) {
            console.log(`Installing on devices... ${deviceStatus.device}`);
            deviceStatus.status = 'installing';
            await req.save();

            //add delay of 3 sec
            await new Promise(res => setTimeout(res, 3000));

            //decide success rate
            const success = Math.random() > 0.1;
            console.log(success);

            deviceStatus.status = success ? 'installed' : 'failed';
            await req.save();
            if (success) {
                await Devices.findByIdAndUpdate(deviceStatus.device._id, { $addToSet: { installedApps: installationReq.app } })
                console.log("database updated");

            }//assosiation: device with apps

            req.completedAt = new Date();
            await req.save();



        }

    } catch (err) {
        console.log("err simulating install " + err);


    }
}
export const getInstalledApps = async (req, res, next) => {
    try {
        const device_id = req.params.deviceId;
        const apps = await Devices.findById(device_id).populate('installedApps');
        console.log("--> ",apps);

        res.json(JSON.parse(JSON.stringify(apps.installedApps)));


    } catch (err) {
        console.log("Eror loading installed apps " + err);

    }
}
