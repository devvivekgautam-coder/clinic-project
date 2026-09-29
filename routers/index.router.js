const express = require('express');
const router = express.Router();

const userRouter = require('../routers/user/user.router');
const doctorRouter = require('../routers/doctors/doctors.router');
const roleRouter = require('../routers/roles/role.router');
const patientRouter = require('../routers/patient/patient.router');
const specializationRouter = require('../routers/specialization/specialization.router');

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

module.exports = router;