import express from 'express';
import authRoutes from './AuthRoutes.js';
import certificateRoutes from './certificateRoutes.js';
import membershipRoutes from './MembershipRoutes.js';
import emailRoutes from './emailRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/certificates', certificateRoutes);
router.use('/membership', membershipRoutes);
router.use('/email', emailRoutes);

export default router;