const express = require('express');
const { registerPatientController, loginPatientController } = require('../../controllers/patients/patients.controller');
const authMiddleware = require('../../middleware/auth/auth.middleware');

const router = express.Router();

router.post('/register', registerPatientController);

router.post('/login', loginPatientController);

// router.get('/fetch', fetchAllPatientController);

// router.get('/fetch/:id', fetchSinglePatientController);

// router.delete('/delete', deletePatientController);

module.exports = router;