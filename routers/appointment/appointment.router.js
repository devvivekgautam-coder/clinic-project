const express = require('express');

const { registerAppointmentController, fetchAllAppointmentController, fetchSingleAppointmentController, editAppointmentController, deleteAppointmentController } = require('../../controllers/appointment/appointment.controller');

const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');

const router = express.Router();

router.post('/register', authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), registerAppointmentController);

router.get('/fetch', authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), fetchAllAppointmentController);

router.get('/fetch/:id', authMiddleware, roleMiddleware('admin', 'doctor', 'patient'), fetchSingleAppointmentController);

router.put('/edit/:id', authMiddleware, roleMiddleware('admin', 'doctor'), editAppointmentController);

router.delete('/delete/:id', authMiddleware, roleMiddleware('admin', 'doctor'), deleteAppointmentController);

module.exports = router;