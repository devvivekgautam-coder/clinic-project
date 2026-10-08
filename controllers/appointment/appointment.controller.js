const Appointment = require("../../models/appointment/appointment.model");
const Patient = require("../../models/patient/patient.model");
const Doctor = require("../../models/doctors/doctors.model");

const registerAppointmentController = async (req, res) => {
    try {
        let { patientProfileId, doctorProfileId, appointmentDate, startTime, endTime, status, bookingKey, cancellationReason } = req.body;

        if (req.user && req.user.role === 'patient' && !patientProfileId) {
            const patient = await Patient.findOne({ userId: req.user.userId });
            if (patient) {
                patientProfileId = patient._id;
            }
        }

        const booked = await Appointment.findOne({ bookingKey });

        if (booked) {
            console.log('Appointment Slot Already Booked.', booked);

            return res.status(400).json({ message: 'Appointment Slot Already Booked.', data: null });
        }

        const appointment = await Appointment.create({
            patientProfileId,
            doctorProfileId,
            appointmentDate,
            startTime,
            endTime,
            status,
            bookingKey,
            cancellationReason
        });

        console.log('Appointment Booked Successfully.', appointment);

        return res.status(201).json({ message: 'Appointment Booked Successfully.', data: appointment });

    } catch (error) {
        console.log('Error While Booking Appointment.', error);

        return res.status(500).json({ message: 'Error While Booking Appointment.', error: error.message });
    }
}

const fetchAllAppointmentController = async (req, res) => {
    try {
        const { doctorProfileId, doctorId, patientProfileId, status } = req.query;
        const filter = {};

        if (doctorProfileId || doctorId) {
            filter.doctorProfileId = doctorProfileId || doctorId;
        }
        if (patientProfileId) {
            filter.patientProfileId = patientProfileId;
        }
        if (status) {
            filter.status = status;
        }

        if (req.user && req.user.role === 'patient') {
            const patient = await Patient.findOne({ userId: req.user.userId });
            if (patient) {
                filter.patientProfileId = patient._id;
            }
        }

        if (req.user && req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId: req.user.userId });
            if (doctor) {
                filter.doctorProfileId = doctor._id;
            }
        }

        const appointment = await Appointment.find(filter)
            .populate('patientProfileId')
            .populate('doctorProfileId');

        if (!appointment) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('All Appointment Fetched Successfully.', appointment);

        return res.status(200).json({ message: 'All Appointment Fetched Successfully.', data: appointment });

    } catch (error) {
        console.log('Error While Fetching All Appointment.', error);

        return res.status(500).json({ message: 'Error While Fetching All Appointment.', error: error.message });
    }
}

const fetchSingleAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id)
            .populate('patientProfileId')
            .populate('doctorProfileId');

        if (!appointment) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Single Appointment Fetched Successfully.', appointment);

        return res.status(200).json({ message: 'Single Appointment Fetched Successfully.', data: appointment });

    } catch (error) {
        console.log('Error While Fetching Single Appointment.', error);

        return res.status(500).json({ message: 'Error While Fetching Single Appointment.', error: error.message });
    }
}

const editAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            patientProfileId,
            doctorProfileId,
            appointmentDate,
            startTime,
            endTime,
            status,
            bookingKey,
            cancellationReason
        } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(id, {
            patientProfileId,
            doctorProfileId,
            appointmentDate,
            startTime,
            endTime,
            status,
            bookingKey,
            cancellationReason
        }, {
            new: true,
            runValidators: true
        })

        if (!appointment) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Appointment Updated Successfully.', appointment);

        return res.status(200).json({ message: 'Appointment Updated Successfully.', data: appointment });

    } catch (error) {
        console.log('Error While Updating Appointment.', error);

        return res.status(500).json({ message: 'Error While Updating Appointment.', error: error.message });
    }
}

const deleteAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Appointment Deleted Successfully.', appointment);

        return res.status(200).json({ message: 'Appointment Deleted Successfully.', data: appointment });

    } catch (error) {
        console.log('Error While Deleting Appointment.', error);

        return res.status(500).json({ message: 'Error While Deleting Appointment.', error: error.message });
    }
}

module.exports = { registerAppointmentController, fetchAllAppointmentController, fetchSingleAppointmentController, editAppointmentController, deleteAppointmentController };