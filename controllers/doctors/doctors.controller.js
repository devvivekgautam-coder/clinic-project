const Doctor = require("../../models/doctors/doctors.model");
const User = require("../../models/user/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerDoctorController = async (req, res) => {
    try {
        const { userId, specializationId, qualification, experienceYears, consultationFee, bio } = req.body;
        let profileImageUrl = req.body.profileImageUrl || null;

        if (req.file) {
            profileImageUrl = `/uploads/doctors/${req.file.filename}`;
        }

        const doctor = await Doctor.create({
            userId,
            specializationId,
            qualification,
            experienceYears,
            consultationFee,
            profileImageUrl,
            bio
        });

        console.log('Doctor Register Successfully.', doctor);

        return res.status(201).json({ message: 'Doctor Register Successfully.', data: doctor });

    } catch (error) {
        console.log('Error While Registering Doctor.', error);

        return res.status(500).json({ message: 'Error While Registering Doctor.', error: error.message });
    }

}

const loginDoctorController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('roleId');

        if (!user) {
            console.log('Invalid Email Or Password.');

            return res.status(401).json({ message: 'Invalid Email Or Password.', data: null });
        }

        if (user.roleId?.name !== 'doctor') {
            console.log('This Is Not A Doctor Account.');

            return res.status(403).json({ message: 'This Is Not A Doctor Account.', data: null });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid Email Or Password.');

            return res.status(401).json({ message: 'Invalid Email Or Password.', data: null });
        }

        const doctor = await Doctor.findOne({ userId: user._id });

        if (!doctor) {
            console.log('Doctor Profile Not Found.');

            return res.status(404).json({ message: 'Doctor Profile Not Found.', data: null });
        }

        const token = jwt.sign({ userId: user._id, role: user.roleId.name, roleId: user.roleId._id },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        console.log('Doctor Login Successfully.', doctor);

        return res.status(200).json({ message: 'Doctor Login Successfully.', data: { user, doctor }, token });

    } catch (error) {
        console.log('Error While Login Doctor.', error);

        return res.status(500).json({ message: 'Error While Login Doctor.', error: error.message });
    }
};

const fetchAllDoctorController = async (req, res) => {
    try {
        const doctor = await Doctor.find()
            .populate('userId', 'name email')
            .populate('specializationId');

        if (!doctor) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('All Doctors Fetched Successfully.', doctor);

        return res.status(200).json({ message: 'All Doctors Fetched Successfully.', data: doctor });

    } catch (error) {
        console.log('Error While Fetching All Doctors.', error);

        return res.status(500).json({ message: 'Error While Fetching All Doctors.', error: error.message });
    }
}

const fetchSingleDoctorController = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findById(id).populate('userId', 'name email').populate('specializationId');

        if (!doctor) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found', data: null });
        }

        console.log('Single Doctor Fetched Successfully.', doctor);

        return res.status(200).json({ message: 'Single Doctor Fetched Successfully.', data: doctor });

    } catch (error) {
        console.log('Error While Fetching Single Doctor.', error);

        return res.status(500).json({ message: 'Error While Fetching Single Doctor.', error: error.message });
    }
}

const editDoctorController = async (req, res) => {
    try {
        const { id } = req.params;

        const { qualification, experienceYears, consultationFee, bio } = req.body;
        let profileImageUrl = req.body.profileImageUrl;

        if (req.file) {
            profileImageUrl = `/uploads/doctors/${req.file.filename}`;
        }

        const updateData = { qualification, experienceYears, consultationFee, bio };
        if (profileImageUrl) {
            updateData.profileImageUrl = profileImageUrl;
        }

        const doctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true })
            .populate('userId', 'name email')
            .populate('specializationId');

        if (!doctor) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Doctor Updated Successfully.', doctor);

        return res.status(200).json({ message: 'Doctor Updated Successfully.', data: doctor });

    } catch (error) {
        console.log('Error While Updating Doctor.', error);

        return res.status(500).json({ message: 'Error While Updating Doctor.', error: error.message });
    }
}

const deleteDoctorController = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findByIdAndDelete(id);

        if (!doctor) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Doctor Deleted Successfully.', doctor);

        return res.status(200).json({ message: 'Doctor Deleted Successfully.', data: doctor });

    } catch (error) {
        console.log('Error While Deleting Doctor.');

        return res.status(500).json({ message: 'Error While Deleting Doctor.', error: error.message });
    }
}

module.exports = { registerDoctorController, loginDoctorController, fetchAllDoctorController, fetchSingleDoctorController, editDoctorController, deleteDoctorController };