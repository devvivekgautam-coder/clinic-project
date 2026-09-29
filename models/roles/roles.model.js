const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;