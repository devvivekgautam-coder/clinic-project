const express = require('express');

const { createPrescriptionController, updatePrescriptionApprovalController, fetchAllPrescriptionController, fetchSinglePrescriptionController, editPrescriptionController, deletePrescriptionController
} = require('../../controllers/prescription/prescription.controller');

const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');

const router = express.Router();

router.post('/create', authMiddleware, roleMiddleware('admin', 'doctor'), createPrescriptionController);

router.get('/fetch', authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), fetchAllPrescriptionController);

router.get('/fetch/:id', authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), fetchSinglePrescriptionController);

router.put('/approval/:id', authMiddleware, roleMiddleware('admin'), updatePrescriptionApprovalController);

router.put('/edit/:id', authMiddleware, roleMiddleware('admin', 'doctor'), editPrescriptionController);

router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), deletePrescriptionController);

module.exports = router;