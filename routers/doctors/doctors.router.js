const express = require('express');
const { registerDoctorController, loginDoctorController, fetchAllDoctorController, fetchSingleDoctorController, editDoctorController, deleteDoctorController } = require('../../controllers/doctors/doctors.controller');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');
const { uploadDoctor } = require('../../middleware/multer/multer');

const router = express.Router();

router.post('/register', authMiddleware, roleMiddleware('admin', 'doctor'), uploadDoctor.single('profileImage'), registerDoctorController);

router.post('/login', loginDoctorController);

router.get('/fetch', fetchAllDoctorController);

router.get('/fetch/:id', fetchSingleDoctorController);

router.put('/edit/:id', authMiddleware, roleMiddleware('admin', 'doctor'), uploadDoctor.single('profileImage'), editDoctorController);

router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), deleteDoctorController);

module.exports = router;