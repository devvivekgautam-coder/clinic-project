const User = require("../../models/user/user.model");
const Patient = require('../../models/patient/patient.model');
const Doctor = require('../../models/doctors/doctors.model');
const Role = require("../../models/roles/roles.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
    try {

        const {
            // User data
            name,
            email,
            password,
            confirmPassword,
            roleId,

            // Patient data
            phone,
            dateOfBirth,
            gender,
            address,

            // Doctor data
            specializationId,
            qualification,
            experienceYears,
            consultationFee,
            profileImageUrl,
            bio

        } = req.body;

        // Password check
        if (password !== confirmPassword) {
            console.log('Password And Confirm Password Do Not Match.');

            return res.status(400).json({ message: 'Password And Confirm Password Do Not Match.', data: null });
        }

        // Check Role
        const roleData = await Role.findById(roleId);

        if (!roleData) {
            console.log('Role Not Found.');

            return res.status(404).json({ message: 'Role Not Found.', data: null });
        }

        console.log("Role Data:", roleData);

        // Password hash
        const pass = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            roleId,
            password: pass
        });

        // PATIENT

        if (roleData.name === 'patient') {
            const patient = await Patient.create({
                userId: user._id,
                phone,
                dateOfBirth,
                gender,
                address
            });

            console.log('Patient Registered Successfully.', patient);

            return res.status(201).json({ message: 'Patient Registered Successfully.', data: { user, patient } });
        }

        // DOCTOR

        if (roleData.name === 'doctor') {
            const doctor = await Doctor.create({
                userId: user._id,
                specializationId,
                qualification,
                experienceYears,
                consultationFee,
                profileImageUrl,
                bio
            });

            console.log('Doctor Registered Successfully.', doctor);

            return res.status(201).json({ message: 'Doctor Registered Successfully.', data: { user, doctor } });
        }

        // Admin

        if (roleData.name === 'admin') {
            console.log('Admin Registered Successfully.', user);

            return res.status(201).json({ message: 'Admin Registered Successfully.', data: { user } });
        }

        return res.status(400).json({ message: 'Invalid Role.', data: null });

    } catch (error) {
        console.log('Error While Registering User.', error);

        return res.status(500).json({ message: 'Error While Registering User.', error: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('roleId');

        if (!user) {
            console.log('User Not Found.');

            return res.status(401).json({ message: 'Invalid Email Or Password.', data: null });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid User Or Password');

            return res.status(401).json({ message: 'Invalid Email Or Password.', data: null });
        }

        const token = jwt.sign({ userId: user._id, role: user.roleId.name, roleId: user.roleId },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        console.log('User Login Successful.', user, token);

        return res.status(200).json({ message: 'User Login Successful.', data: user, token });

    } catch (error) {
        console.log('Error While Logging In User.', error);

        return res.status(500).json({ message: 'Error While Logging In User.', error: error.message });
    }
};

const fetchAllUserController = async (req, res) => {
    try {
        const user = await User.find();

        if (!user) {
            console.log('User Not Found.')

            return res.status(404).json({ message: 'User Not Found.', data: null });
        }

        console.log('All User Fetched Usccessfully.', user);

        return res.status(200).json({ message: 'All User Fetched SUccessfully.', data: user })

    } catch (error) {
        console.log('Error While Fetching All User.', error);

        return res.status(500).json({ message: 'Error While Fetching All Users.', error: error.message })
    }
}

const fetchSingleUserController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            console.log("User Not Found.");

            return res.status(404).json({ message: "User Not Found.", data: null });
        }

        console.log("Single User Fetched Successfully.", user);

        return res.status(200).json({ message: "Single User Fetched Successfully.", data: user });

    } catch (error) {
        console.log("Error While Fetching Single User.", error);

        return res.status(500).json({ message: "Error While Fetching Single User.", error: error.message });
    }
};

const editUserController = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, email, password, phone } = req.body;
        const updateData = { name, email };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!updatedUser) {
            console.log('User Not Found.');

            return res.status(404).json({ message: 'User Not Found.', data: null });
        }

        console.log('User Updated Successfully.', updatedUser);

        return res.status(200).json({ message: 'User Updated Successfully.', data: updatedUser })

    } catch (error) {
        console.log('Error While Updating User.', error);

        return res.status(500).json({ message: 'Error While Updating User.', error: error.message })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            console.log('User Not Found.');

            return res.status(404).json({ message: 'User Not Found.', data: null })
        }

        console.log('User Deleted Successfully.', user);

        return res.status(200).json({ message: 'User Deleted Successfully.', data: user })
    } catch (error) {
        console.log('Error While Deleting User.', error);

        return res.status(500).json({ message: 'Error While Deleting User.', error: error.message });
    }
};

const getMeController = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).populate('roleId').select('-password');

        if (!user) {
            console.log('User Not Found.');

            return res.status(404).json({ message: 'User Not Found.', data: null });
        }

        let patient = null;
        let doctor = null;

        if (user.roleId?.name === 'patient') {
            patient = await Patient.findOne({ userId });
        } else if (user.roleId?.name === 'doctor') {
            doctor = await Doctor.findOne({ userId }).populate('specializationId');
        }

        console.log('Current User Profile Fetched Successfully.', user);

        return res.status(200).json({ 
            message: 'Current User Profile Fetched Successfully.', 
            data: { user, patient, doctor } 
        });

    } catch (error) {
        console.log('Error While Fetching Current User Profile.', error);

        return res.status(500).json({ message: 'Error While Fetching Current User Profile.', error: error.message });
    }
};

module.exports = { registerController, loginController, fetchAllUserController, fetchSingleUserController, editUserController, deleteUserController, getMeController };