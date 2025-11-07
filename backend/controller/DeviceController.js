import Device from '../models/Device.js';
import User from '../models/User.js';

export const registerDevice = async (req, res, next) => {
    try {
        const users = await User.find().lean();  // get users name from db
        console.log("users=> "+ users);
        
        res.render('registerdevice', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load users ');
    }
    //res.status(201).json({ message: "redirecting to register device view ", redirect: "/registerDeviceView" })

}

export const saveDevice = async (req, res, next) => {
    const dev = req.body;


    try {
        const newDevice = await Device.create({
            id: dev.id,
            name: dev.name,
            type: dev.type,
            os: dev.os,
            owner: dev.owner,
            installedApps: []

        });


        await User.findByIdAndUpdate(dev.owner, { $push: { devices: newDevice._id } }) //assosiation: device with User

        res.format({
            'application/json': () =>{
                res.status(201).json({ message: "device added suucessfully!! ", device: newDevice, redirect: '/dashboard' })

            },
            'text/html' :() => {
                res.render('dashboard',{message: "Device registered"});


            }
        })

        


    } catch (err) {
        console.log("Error saving device " + err);
        res.status(400).json({message: err});

    }
};

export const showAlldevices = async (req, res) => {
    try {
        const devices = await Device.find().lean().populate([
            { path: 'owner', select: 'name' },
            { path: 'installedApps', select: 'name' }
        ]);  // optionally filter by user if needed
        //console.log(devices);

        res.format({
            'application/json': () => {
                res.json(devices);
            },
            'text/html': () => {
                console.log("devices to render:", devices);

                res.render('devices', { devices })
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load install form');
    }

}
export const getDevice = async (req, res, next) => {
    try {
        const devices = await Device.find({ owner: req.params.userId });
        console.log(devices);
        
        res.json(devices);
    } catch (err) {
        console.log("error in finding devices.. " + err);


    }
};

