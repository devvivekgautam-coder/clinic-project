const express = require('express');
const router = express.Router();

const userRouter = require('../routers/user/user.router');
const doctorRouter = require('../routers/doctors/doctors.router');
const roleRouter = require('../routers/roles/role.router');
const patientRouter = require('../routers/patient/patient.router');
const specializationRouter = require('../routers/specialization/specialization.router');
const appointmentRouter = require('../routers/appointment/appointment.router');
const prescriptionRouter = require('../routers/prescription/prescription.router');
const prescriptionItemsRouter = require('../routers/prescription/prescription-items.router');
const doctorAvailabilityRouter = require('../routers/doctors/doctor.availability.router');

// User Router
router.use('/user', userRouter);

// Doctor Router
router.use('/doctor', doctorRouter);

// Role Router
router.use('/role', roleRouter);

// Patient Router
router.use('/patient', patientRouter);

// Specialization Router
router.use('/specialization', specializationRouter);

// Appointment Router
router.use('/appointment', appointmentRouter);

// Prescription Router
router.use('/prescription', prescriptionRouter);

// Prescription Items Router
router.use('/prescription-items', prescriptionItemsRouter);

// Doctor Availability Router
router.use('/doctor-availability', doctorAvailabilityRouter);

module.exports = router;