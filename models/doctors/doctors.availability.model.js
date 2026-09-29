const mongoose = require('mongoose');

const doctorAvailabilitySchema = new mongoose.Schema({
    doctorProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: true,
        trim: true
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
    isActive: {
        type: Boolean,
        default: true
    },
    availabilityKey: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

const DoctorAvailability = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);

module.exports = DoctorAvailability;
