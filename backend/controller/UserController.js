import User from '../models/User.js'
import Device from '../models/Device.js';

export const registerUser = async (req, res, next) => {
    const roles = [
        { value: "Admin", label: "Admin" },
        { value: "user", label: "User" }
    ];

    res.format({
        'application/json': () => {
            res.status(201).json({ message: "redirecting to register user view ", redirect: "/registerUserView" })

        },
        'text/html': () => {
            res.render('registeruser', { role: roles });

        }
    });
    //res.status(201).json({message: "redirecting to register user view ", redirect: "/registerUserView"})
}

export const saveUser = async (req, res, next) => {
    
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            devices: []
        });

        console.log("registered new user successfully!!");
        res.format({
            'application/json': () => {
                res.status(200).json({ user: newUser, message: "registered new user successfully!!", redirect: "/login" }); // JSON response for react
            },
            'text/html': () => {
                res.render('login');

            }
        })


    } catch (err) {
        console.error(err);

    }

}

export const loginUser = async (req, res, next) => {
    res.format({
        'application/json': () => {
            res.status(201).json({ message: "redirecting to login page view", redirect: "/loginUserView" })

        },
        'text/html': () => {
            res.render('login');

        }
    });
}

export const verifyLoginUser = async (req, res, next) => {    
    const sessionUser = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    };
    req.session.user = sessionUser;

    if(sessionUser.role != 'Admin'){
        const device_info = await Device.find({owner: sessionUser.id}).populate('installedApps', 'name category').lean();
        res.format({
        'application/json': () => {
            res.status(201).json({
                message: "Login successfull",
                user: sessionUser,
                redirect: "/userDashboard"
            })
        },
        'text/html': () => {
            res.render('userDashboard', {user: sessionUser , devices: device_info, isAdmin: sessionUser.role === 'Admin'});

        }
    })
        
    }else{
    res.format({
        'application/json': () => {
            res.status(201).json({
                message: "Login successfull",
                user: sessionUser,
                redirect: "/dashboard"
            })
        },
        'text/html': () => {
            res.render('dashboard', { message: "Navigate from top bar", user: sessionUser, isAdmin: sessionUser.role === 'Admin' });

        }
    })

    }
}