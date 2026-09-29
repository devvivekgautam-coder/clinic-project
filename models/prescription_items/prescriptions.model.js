const mongoose = require('mongoose');

const prescriptionsSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    additionalNotes: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionsSchema);

module.exports = Prescription;