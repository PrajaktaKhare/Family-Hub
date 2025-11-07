import express from 'express'
import { getDevice, registerDevice, saveDevice, showAlldevices } from '../controller/DeviceController.js';

const router = express();

router.get('/registerDevice', registerDevice)//redirect to add new dewvice view
router.post('/registerDevice', saveDevice); //register new device
router.get('/view', showAlldevices) // showw all devices

router.get('/:userId',getDevice) //get devices registered under perticular user


export default router