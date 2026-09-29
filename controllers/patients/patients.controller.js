const Patient = require("../../models/patient/patient.model");
const User = require("../../models/user/user.model");
const bcrypt = require('bcrypt');

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

        const user = await User.find({ email });

        if (!user) {
            console.log('Patient Not Registered.');

            return res.status(404).json({ message: 'Patient Not Found.', data: null })
        }

        if (user.role !== 'patient') {
            console.log('This Is Not A Patient Account.');

            return res.status(403).json({ message: 'This Is Not A Patient Account.', data: null })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Wrong User Or Password.');

            return res.status(401).json({ message: 'Wrong User Or Password.', data: null });
        }

        const patient = await Patient.findOne({ userId: user._id });

        if (!patient) {
            console.log('Patient Not Found.');

            return res.status(404).json({ message: 'Patient Not Found.', data: null });
        }

        console.log('Patient Login Successfully.', patient);

        return res.status(200).json({ message: 'Patient Login Successfully.', data: patient });

    } catch (error) {
        console.log('Error While Login Patient', error);

        return res.status(500).json({ message: 'Error While Login Patient.', error: error.message })
    }
}

module.exports = { registerPatientController, loginPatientController };