const express = require('express');
const { registerPatientController, loginPatientController, fetchAllPatientController, fetchSinglePatientController, editPatientController, deletePatientController } = require('../../controllers/patients/patients.controller');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');

const router = express.Router();

router.post('/register',authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), registerPatientController);

router.post('/login', loginPatientController);

router.get('/fetch',authMiddleware, roleMiddleware('admin'), fetchAllPatientController);

router.get('/fetch/:id',authMiddleware, roleMiddleware('admin'), fetchSinglePatientController);

router.put('/edit/:id',authMiddleware, roleMiddleware('admin', 'patient'), editPatientController)

router.delete('/delete/:id',authMiddleware, roleMiddleware('admin'), deletePatientController);

module.exports = router;