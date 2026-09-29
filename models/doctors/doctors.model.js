const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    specializationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization',
        required: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    experienceYears: {
        type: Number,
        required: true,
        min: 0
    },
    consultationFee: {
        type: Number,
        required: true,
        min: 0
    },
    profileImageUrl: {
        type: String,
        trim: true,
        default: null
    },
    bio: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;