const Doctor = require("../../models/doctors/doctors.model");

const registerDoctorController = async (req, res) => {
    try {
        const { userId, specializationId, qualification, experienceYears, consultationFee, profileImageUrl, bio } = req.body;

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

module.exports = registerDoctorController;