const mongoose = require('mongoose');

const prescriptionsSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        default: null
    },
    additionalNotes: {
        type: String,
        trim: true,
        default: ''
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adminRemarks: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionsSchema);

module.exports = Prescription;