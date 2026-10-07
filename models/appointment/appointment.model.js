const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
        trim: true
    },
    endTime: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        required: true,
        default: 'scheduled'
    },
    bookingKey: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    cancellationReason: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;