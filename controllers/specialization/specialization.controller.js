const Specialization = require("../../models/specializations/specialization.model");

const registerSpecializationController = async (req, res) => {
    try {
        const { name, description } = req.body;

        const specialization = await Specialization.create({
            name,
            description
        });

        console.log('Specialization Created Successfully.', specialization);

        return res.status(201).json({ message: 'Specialization Created Successfully.', data: specialization })

    } catch (error) {
        console.log('Error While Creating Specialization.', error);

        return res.status(500).json({ message: 'Error While Creating Specialization.', error: error.message })

    }
}

const fetchAllSpecializationController = async (req, res) => {
    try {
        const specialization = await Specialization.find();

        if (!specialization) {
            console.log('Not Found Please Register.')

            return res.status(404).json({ message: 'Not Found Please Register.', data: null })
        }

        console.log('All Specialization Fatched.', specialization);

        return res.status(200).json({ message: 'All Specialization Fatched.', data: specialization })

    } catch (error) {
        console.log('Error While Fetching All Specialization.', error);

        return res.status(500).json({ message: 'Error While Fetching All Specialization.', error: error.messagee })
    }

}

const fetchSingleSpecializationController = async (req, res) => {
    try {
        const { id } = req.body;

        const specialization = await Specialization.find({ id });

        if (!specialization) {
            console.log('Not Found Please Register.');

            return res.status(404).json({ message: 'Not Found Please Register.', data: null })
        }

        console.log('Single Specialization Fetched Successfully.', specialization);

        return res.status(200).json({ message: 'Single Specialization Fetched Successfully.', data: specialization })
    } catch (error) {
        console.log('Error While Fetching Single Specialization.', error);

        return res.status(500).json({ message: 'Error While Fetching Single Specialization.', error: error.message })
    }
}

const editSpecializationController = async (req, res) => {
    try {
        const { id, name, description } = req.body;

        const specialization = await Specialization.findOneAndUpdate(id, {
            name,
            description
        },
            {
                new: true,
                runValidators: true
            }
        );

        if (!specialization) {
            console.log('Specialization Not Found.');

            return res.status(404).json({ message: 'Specialization Not Found.', data: null });
        }

        console.log('Specialization Updated Successfully.', specialization);

        return res.status(200).json({ message: 'Specialization Updated Successfully.', data: specialization })

    } catch (error) {
        console.log('Error While Updating Specialization.', error);

        return res.status(500).json({ message: 'Error While Updating Specialization.', error: error.message });
    }

}

const deleteSpecializationController = async (req, res) => {
    try {
        const { id } = req.params;

        const specialization = await Specialization.findOneAndDelete(id);

        if (!specialization) {
            console.log('Specialization Not Found.')

            return res.status(404).json({ message: 'Specialization Not Found.', data: null })
        }

        console.log('Specialization Deleted Successfully.', specialization);

        return res.status(200).json({ message: 'Specialization Deleted Successfully.', data: specialization })
    } catch (error) {
        console.log('Error While Deleting Specialization.', error);

        return res.status(500).json({ message: 'Error While Deleting Specialization.', error: error.message });
    }
}

module.exports = { registerSpecializationController, fetchAllSpecializationController, fetchSingleSpecializationController, editSpecializationController, deleteSpecializationController };