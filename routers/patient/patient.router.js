const express = require('express');
const { registerPatientController, loginPatientController, fetchAllPatientController, fetchSinglePatientController, editPatientController, deletePatientController } = require('../../controllers/patients/patients.controller');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');
const { uploadPatient } = require('../../middleware/multer/multer');

const router = express.Router();

router.post('/register', authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), uploadPatient.single('profileImage'), registerPatientController);

router.post('/login', loginPatientController);

router.get('/fetch', authMiddleware, roleMiddleware('admin'), fetchAllPatientController);

router.get('/fetch/:id', authMiddleware, roleMiddleware('admin'), fetchSinglePatientController);

router.put('/edit/:id', authMiddleware, roleMiddleware('admin', 'patient'), uploadPatient.single('profileImage'), editPatientController);

router.delete('/delete/:id',authMiddleware, roleMiddleware('admin'), deletePatientController);

module.exports = router;