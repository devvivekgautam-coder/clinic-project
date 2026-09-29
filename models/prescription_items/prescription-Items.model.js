const mongoose = require("mongoose");

const prescriptionItemSchema = new mongoose.Schema({
    prescriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
        required: true
    },
    medicineName: {
        type: String,
        required: true,
        trim: true
    },
    dosageInstructions: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true
    }
);

const PrescriptionItems = mongoose.model("PrescriptionItems", prescriptionItemSchema);

module.exports = PrescriptionItems;