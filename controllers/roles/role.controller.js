const Role = require("../../models/roles/roles.model");

const createRoleController = async (req, res) => {
    try {
        const { name, description } = req.body;

        const role = await Role.create({
            name,
            description
        });

        console.log('Role Created Successfully.', role);

        res.status(201).json({ message: 'Role Created Successfully.', data: role })

    } catch (error) {
        console.log('Error While Creating Role.', error);

        res.status(500).json({ message: 'Error While Creating Role.', error: error.message })
    }
}

const fetchRoleController = async (req, res) => {
    try {
        const role = await Role.find();

        if (!role) {
            console.log('Role Not Found.');

            return res.status(404).json({ message: 'Role Not Found.', data: null });
        }

        console.log('All Role Role Fetched.', role);

        return res.status(200).json({ message: 'All Role Fetched Successfully.', data: role });

    } catch (error) {
        console.log('Error While Fetching Role.', error);

        return res.status(500).json({ message: 'Error While Fetching Role.', error: error.message });
    }
}

const editRoleController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const editRoleData = await Role.findByIdAndUpdate(id, {
            name,
            description
        }, {
            new: true,
            runValidators: true
        });

        if (!editRoleData) {
            console.log('Role Not Found.');

            return res.status(404).json({ message: 'Role Not Found.', data: null });
        }

        console.log('Role Updated Successfully.', editRoleData);

        return res.status(200).json({ message: 'Role Updated Successfully.', editRoleData });

    } catch (error) {
        console.log('Error While Editing Role.', error);

        return res.status(500).json({ message: 'Error While Editing Role.', error: error.message });
    }
}

const deleteRoleController = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteRoleData = await Role.findByIdAndDelete(id);

        if (!deleteRoleData) {
            console.log('Role Not Found.');

            return res.status(404).json({ message: 'Role Not Found.', data: null });
        }

        console.log('Role Deleted Successfully.', deleteRoleData);

        return res.status(200).json({ message: 'Role Deleted Successfully.', data: deleteRoleData });

    } catch (error) {
        console.log('Error While Deleting Role.', error);

        return res.status(500).json({ message: 'Error While Deleting Role.', error: error.message });
    }
}

module.exports = { createRoleController, fetchRoleController, editRoleController, deleteRoleController };