import express from 'express'
import { getAllApps,createInstallRequest, getInstalledApps,showInstallForm } from '../controller/AppController.js';
const router = express.Router();

router.get('/list', getAllApps); //list all apps
router.post('/install/', createInstallRequest) //get install req for multiple devices
router.get('/install', showInstallForm) // Route to render this form with apps and devices loaded
router.get('/install/:deviceId', getInstalledApps)// get all installed apps in 1 device
//router.get('/install/status/:reqId', )// get status of install req


export default router;