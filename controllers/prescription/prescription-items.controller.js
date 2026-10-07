const PrescriptionItems = require("../../models/prescription_items/prescription-Items.model");

const createPrescriptionItemController = async (req, res) => {
    try {
        const { prescriptionId, medicineName, dosageInstructions, duration, notes } = req.body;

        const prescriptionItem = await PrescriptionItems.create({
            prescriptionId,
            medicineName,
            dosageInstructions,
            duration,
            notes
        });

        console.log('Prescription Item Added Successfully.', prescriptionItem);

        return res.status(201).json({ message: 'Prescription Item Added Successfully.', data: prescriptionItem });

    } catch (error) {
        console.log('Error While Adding Prescription Item.', error);

        return res.status(500).json({ message: 'Error While Adding Prescription Item.', error: error.message });
    }
};

const fetchPrescriptionItemsByPrescriptionIdController = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const items = await PrescriptionItems.find({ prescriptionId }).populate('prescriptionId');

        if (!items) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Prescription Items Fetched Successfully.', items);

        return res.status(200).json({ message: 'Prescription Items Fetched Successfully.', data: items });

    } catch (error) {
        console.log('Error While Fetching Prescription Items.', error);

        return res.status(500).json({ message: 'Error While Fetching Prescription Items.', error: error.message });
    }
};

const editPrescriptionItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicineName, dosageInstructions, duration, notes } = req.body;

        const updatedItem = await PrescriptionItems.findByIdAndUpdate(id, {
            medicineName,
            dosageInstructions,
            duration,
            notes
        }, {
            new: true,
            runValidators: true
        });

        if (!updatedItem) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Prescription Item Updated Successfully.', updatedItem);

        return res.status(200).json({ message: 'Prescription Item Updated Successfully.', data: updatedItem });

    } catch (error) {
        console.log('Error While Updating Prescription Item.', error);

        return res.status(500).json({ message: 'Error While Updating Prescription Item.', error: error.message });
    }
};

const deletePrescriptionItemController = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await PrescriptionItems.findByIdAndDelete(id);

        if (!item) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Prescription Item Deleted Successfully.', item);

        return res.status(200).json({ message: 'Prescription Item Deleted Successfully.', data: item });

    } catch (error) {
        console.log('Error While Deleting Prescription Item.', error);

        return res.status(500).json({ message: 'Error While Deleting Prescription Item.', error: error.message });
    }
};

module.exports = {
    createPrescriptionItemController,
    fetchPrescriptionItemsByPrescriptionIdController,
    editPrescriptionItemController,
    deletePrescriptionItemController
};
