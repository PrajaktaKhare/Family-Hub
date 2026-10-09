import express from 'express'
import { getDevice, registerDevice, saveDevice, showAlldevices } from '../controller/DeviceController.js';
import {
    ensureAuthenticated,
    requireRole,
  requireSelfOrAdmin
} from '../middleware/authMiddleware.js';

const router = express();

router.get(
    '/registerDevice',
    ensureAuthenticated,
    requireRole('Admin'),
    registerDevice
);

router.post(
    '/registerDevice',
    ensureAuthenticated,
    requireRole('Admin'),
    saveDevice
);

router.get(
    '/view',
    ensureAuthenticated,
    requireRole('Admin'),
    showAlldevices
);

router.get(
    '/:userId',
    ensureAuthenticated,
    requireSelfOrAdmin,
    getDevice
);

export default router
