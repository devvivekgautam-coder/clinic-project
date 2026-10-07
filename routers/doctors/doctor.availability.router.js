const express = require('express');
const { 
    registerDoctorAvailabilityController, 
    fetchAllDoctorAvailabilityController, 
    fetchSingleDoctorAvailabilityController, 
    editDoctorAvailabilityController, 
    deleteDoctorAvailabilityController 
} = require('../../controllers/doctors/doctor.availability.controller');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');

const router = express.Router();

router.post('/register', authMiddleware, roleMiddleware('admin', 'doctor'), registerDoctorAvailabilityController);

router.get('/fetch', fetchAllDoctorAvailabilityController);

router.get('/fetch/:id', fetchSingleDoctorAvailabilityController);

router.put('/edit/:id', authMiddleware, roleMiddleware('admin', 'doctor'), editDoctorAvailabilityController);

router.delete('/delete/:id', authMiddleware, roleMiddleware('admin', 'doctor'), deleteDoctorAvailabilityController);

module.exports = router;