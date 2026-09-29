const express = require('express');
const registerDoctorController = require('../../controllers/doctors/doctors.controller');

const router = express.Router();

router.post('/register', registerDoctorController);

module.exports = router;