const Patient = require("../../models/patient/patient.model");
const User = require("../../models/user/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerPatientController = async (req, res) => {
    try {
        const { userId, phone, dateOfBirth, gender, address } = req.body;

        // const user = await User.findById(_id);
        // const {id} = user._id;

        const patient = await Patient.create({
            userId,
            phone,
            dateOfBirth,
            gender,
            address
        });

        console.log('Patient Register Successfully.', patient);

        return res.status(201).json({ message: 'Patient Register Successfully.', data: patient })
    } catch (error) {
        console.log('Error While Register Patient.', error);

        return res.status(500).json({ message: 'Error While Register Patient.', error: error.message })
    }
}

const loginPatientController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('roleId');

        if (!user) {
            return res.status(401).json({ message: 'Invalid Email Or Password.', data: null });
        }

        if (user.roleId?.name !== 'patient') {
            return res.status(403).json({ message: 'This Is Not A Patient Account.', data: null });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Email Or Password.', data: null });
        }
        const patient = await Patient.findOne({ userId: user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient Profile Not Found.', data: null });
        }

        const token = jwt.sign({ userId: user._id, role: user.roleId.name, roleId: user.roleId._id },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        console.log('Patient Login Successfully.', { user, patient }, token);

        return res.status(200).json({ message: 'Patient Login Successfully.', data: { user, patient }, token });

    } catch (error) {
        console.log('Error While Login Patient', error);

        return res.status(500).json({ message: 'Error While Login Patient.', error: error.message });
    }
};

const fetchAllPatientController = async (req, res) => {
    try {
        const patient = await Patient.find();

        if (!patient) {
            console.log('Patient Not Found.');

            return res.status(404).json({ message: 'Patient Not Found.', data: null });
        }

        console.log('All Patient Fetched Successfully.', patient);

        return res.status(200).json({ message: 'All Patient Fetched Successfully.', data: patient })

    } catch (error) {
        console.log('Error While Fetching All Patients.', error);

        return res.status(500).json({ message: 'Error While Fetching All Patients.', error: error.message });
    }
}

const fetchSinglePatientController = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findById(id);

        if (!patient) {
            console.log('Patient Not Found.');

            return res.status(404).json({ message: 'Patient Not Found.', data: null });
        }

        console.log('Single Patient Fetched Successfully.', patient);

        return res.status(200).json({ message: 'Single Patient Fetched Successfully.', data: patient });

    } catch (error) {
        console.log('Error While Fetching Single Patient.', error);

        return res.status(500).json({ message: 'Error While Fetching Single Patient.', error: error.message });
    }
}

const editPatientController = async (req, res) => {
    try {
        const { id } = req.params;
        const { phone, dateOfBirth, gender, address } = req.body;

        const updatedPatient = await Patient.findByIdAndUpdate(id, {
            phone,
            dateOfBirth,
            gender,
            address
        }, {
            new: true,
            runValidators: true
        });

        if (!updatedPatient) {
            console.log('Patient Not Found.');

            return res.status(404).json({ message: 'Patient Not Found.', data: null });
        }

        console.log('Patient Updated Successfully.', updatedPatient);

        return res.status(200).json({ message: 'Patient Updated Successfully.', data: updatedPatient });

    } catch (error) {
        console.log('Error While Updating Patient.', error);

        return res.status(500).json({ message: 'Error While Updating Patient.', error: error.message })
    }
}

const deletePatientController = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) {
            console.log('Patient Not Found.');

            return res.status(404).json({ message: 'Patient Not Found.', data: null });
        }

        console.log('Patient Deleted Successfully.', patient);

        return res.status(200).json({ message: 'Patient Deleted Successfully.', data: patient });

    } catch (error) {
        console.log('Error While Deleting Patient.', error);

        return res.status(500).json({ message: 'Error While Deleting Patient.', error: error.message });
    }
}

module.exports = { registerPatientController, loginPatientController, fetchAllPatientController, fetchSinglePatientController, editPatientController, deletePatientController };