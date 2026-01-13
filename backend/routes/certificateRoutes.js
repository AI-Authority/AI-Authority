import express from 'express';
import { uploadCertificate, getCertificates, getAllCertificates, deleteCertificate, updateCertificate } from '../controllers/certificateController.js';

const router = express.Router();

// Upload certificate route
router.post('/upload', uploadCertificate);

// Get all certificates route (sorted by date)
router.get('/all', getAllCertificates);

// Get certificates route (by user email)
router.get('/', getCertificates);

// Update certificate route
router.put('/:id', updateCertificate);

// Delete certificate route
router.delete('/:email/:certificateId', deleteCertificate);

export default router;