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

module.exports = createRoleController;