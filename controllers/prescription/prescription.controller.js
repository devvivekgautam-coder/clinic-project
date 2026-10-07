const Prescription = require("../../models/prescription_items/prescriptions.model");
const Doctor = require("../../models/doctors/doctors.model");

const createPrescriptionController = async (req, res) => {
    try {
        const { appointmentId, additionalNotes } = req.body;
        let doctorId = req.body.doctorId;

        if (req.user && req.user.role === 'doctor' && !doctorId) {
            const doctor = await Doctor.findOne({ userId: req.user.userId });
            if (doctor) {
                doctorId = doctor._id;
            }
        }

        const prescription = await Prescription.create({
            appointmentId,
            doctorId,
            additionalNotes,
            approvalStatus: 'pending'
        });

        console.log('Prescription Created And Sent For Admin Approval.', prescription);

        return res.status(201).json({ message: 'Prescription Created And Sent For Admin Approval.', data: prescription });

    } catch (error) {
        console.log('Error While Creating Prescription.', error);

        return res.status(500).json({ message: 'Error While Creating Prescription.', error: error.message });
    }
}

const updatePrescriptionApprovalController = async (req, res) => {
    try {
        const { id } = req.params;
        const { approvalStatus, adminRemarks } = req.body;

        if (!['approved', 'rejected'].includes(approvalStatus)) {
            return res.status(400).json({ message: 'Invalid Approval Status. Must be "approved" or "rejected".', data: null });
        }

        const prescription = await Prescription.findByIdAndUpdate(id, {
            approvalStatus,
            adminRemarks: adminRemarks || ''
        }, {
            new: true,
            runValidators: true
        });

        if (!prescription) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log(`Prescription Status Updated To ${approvalStatus}.`, prescription);

        return res.status(200).json({ message: `Prescription Status Updated To ${approvalStatus}.`, data: prescription });

    } catch (error) {
        console.log('Error While Updating Prescription Approval.', error);

        return res.status(500).json({ message: 'Error While Updating Prescription Approval.', error: error.message });
    }
}

const fetchAllPrescriptionController = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};

        if (status) {
            filter.approvalStatus = status;
        }

        const prescription = await Prescription.find(filter)
            .populate('appointmentId')
            .populate('doctorId');

        if (!prescription) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('All Prescription Fetched Successfully.', prescription);

        return res.status(200).json({ message: 'All Prescription Fetched Successfully.', data: prescription });

    } catch (error) {
        console.log('Error While Fetching All Prescription.', error);

        return res.status(500).json({ message: 'Error While Fetching All Prescription.', error: error.message });
    }
}

const fetchSinglePrescriptionController = async (req, res) => {
    try {
        const { id } = req.params;

        const prescription = await Prescription.findById(id).populate('appointmentId').populate('doctorId');

        if (!prescription) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Single Prescription Fetched Successfully.', prescription);

        return res.status(200).json({ message: 'Single Prescription Fetched Successfully.', data: prescription });

    } catch (error) {
        console.log('Error While Fetching Single Prescription.', error);

        return res.status(500).json({ message: 'Error While Fetching Single Prescription.', error: error.message });
    }
}

const editPrescriptionController = async (req, res) => {
    try {
        const { id } = req.params;
        const { appointmentId, additionalNotes } = req.body;

        const prescription = await Prescription.findByIdAndUpdate(id, {
            appointmentId,
            additionalNotes
        }, {
            new: true,
            runValidators: true
        });

        if (!prescription) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Prescription Updated Successfully.', prescription);

        return res.status(200).json({ message: 'Prescription Updated Successfully.', data: prescription });

    } catch (error) {
        console.log('Error While Editing Prescription.', error);

        return res.status(500).json({ message: 'Error While Editing Prescription.', error: error.message });
    }
}

const deletePrescriptionController = async (req, res) => {
    try {
        const { id } = req.params;

        const prescription = await Prescription.findByIdAndDelete(id);

        if (!prescription) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Prescription Deleted Successfully.', prescription);

        return res.status(200).json({ message: 'Prescription Deleted Successfully.', data: prescription });

    } catch (error) {
        console.log('Error While Deleting Prescription.', error);

        return res.status(500).json({ message: 'Error While Deleting Prescription.', error: error.message });
    }
}

module.exports = {
    createPrescriptionController,
    updatePrescriptionApprovalController,
    fetchAllPrescriptionController,
    fetchSinglePrescriptionController,
    editPrescriptionController,
    deletePrescriptionController
};