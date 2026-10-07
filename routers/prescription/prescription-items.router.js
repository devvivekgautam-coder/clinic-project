const express = require('express');
const {
    createPrescriptionItemController,
    fetchPrescriptionItemsByPrescriptionIdController,
    editPrescriptionItemController,
    deletePrescriptionItemController
} = require('../../controllers/prescription/prescription-items.controller');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');

const router = express.Router();

router.post('/create', authMiddleware, roleMiddleware('admin', 'doctor'), createPrescriptionItemController);

router.get('/fetch/:prescriptionId', authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), fetchPrescriptionItemsByPrescriptionIdController);

router.put('/edit/:id', authMiddleware, roleMiddleware('admin', 'doctor'), editPrescriptionItemController);

router.delete('/delete/:id', authMiddleware, roleMiddleware('admin', 'doctor'), deletePrescriptionItemController);

module.exports = router;
