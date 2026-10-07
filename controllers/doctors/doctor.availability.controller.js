const DoctorAvailability = require("../../models/doctors/doctors.availability.model");
const Doctor = require("../../models/doctors/doctors.model");

const registerDoctorAvailabilityController = async (req, res) => {
    try {
        let { doctorProfileId, dayOfWeek, startTime, endTime, isActive, availabilityKey } = req.body;

        // Agar logged-in user doctor hai aur body me doctorProfileId nahi di, toh automatic attach karein
        if (req.user && req.user.role === 'doctor' && !doctorProfileId) {
            const doctor = await Doctor.findOne({ userId: req.user.userId });
            if (doctor) {
                doctorProfileId = doctor._id;
            }
        }

        const booked = await DoctorAvailability.findOne({ availabilityKey });

        if (booked) {
            console.log('Doctor Slot Already Registered.');

            return res.status(400).json({ message: 'Doctor Slot Already Registered.', data: null });
        }

        const doctorAvailability = await DoctorAvailability.create({
            doctorProfileId,
            dayOfWeek,
            startTime,
            endTime,
            isActive: isActive !== undefined ? isActive : true,
            availabilityKey
        });

        console.log('Doctor Availability Registered Successfully.', doctorAvailability);

        return res.status(201).json({ message: 'Doctor Availability Registered Successfully.', data: doctorAvailability });

    } catch (error) {
        console.log('Error While Registering Doctor Availability.', error);

        return res.status(500).json({ message: 'Error While Registering Doctor Availability.', error: error.message });
    }
}

const fetchAllDoctorAvailabilityController = async (req, res) => {
    try {
        const { dayOfWeek, doctorProfileId } = req.query;
        const filter = {};

        if (dayOfWeek) filter.dayOfWeek = dayOfWeek;
        if (doctorProfileId) filter.doctorProfileId = doctorProfileId;

        const doctorAvailability = await DoctorAvailability.find(filter).populate('doctorProfileId');

        if (!doctorAvailability) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('All Doctor Availability Fetched Successfully.', doctorAvailability);

        return res.status(200).json({ message: 'All Doctor Availability Fetched Successfully.', data: doctorAvailability });

    } catch (error) {
        console.log('Error While Fetching All Doctor Availability.', error);

        return res.status(500).json({ message: 'Error While Fetching All Doctor Availability.', error: error.message });
    }
}

const fetchSingleDoctorAvailabilityController = async (req, res) => {
    try {
        const { id } = req.params;

        const doctorAvailability = await DoctorAvailability.findById(id).populate('doctorProfileId');

        if (!doctorAvailability) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Single Doctor Availability Fetched Successfully.', doctorAvailability);

        return res.status(200).json({ message: 'Single Doctor Availability Fetched Successfully.', data: doctorAvailability });

    } catch (error) {
        console.log('Error While Fetching Single Doctor Availability.', error);

        return res.status(500).json({ message: 'Error While Fetching Single Doctor Availability.', error: error.message });
    }
}

const editDoctorAvailabilityController = async (req, res) => {
    try {
        const { id } = req.params;
        const { dayOfWeek, startTime, endTime, isActive, availabilityKey } = req.body;

        const doctorAvailability = await DoctorAvailability.findByIdAndUpdate(id, {
            dayOfWeek,
            startTime,
            endTime,
            isActive,
            availabilityKey
        }, {
            new: true,
            runValidators: true
        });

        if (!doctorAvailability) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Doctor Availability Updated Successfully.', doctorAvailability);

        return res.status(200).json({ message: 'Doctor Availability Updated Successfully.', data: doctorAvailability });

    } catch (error) {
        console.log('Error While Updating Doctor Availability.', error);

        return res.status(500).json({ message: 'Error While Updating Doctor Availability.', error: error.message });
    }
}

const deleteDoctorAvailabilityController = async (req, res) => {
    try {
        const { id } = req.params;

        const doctorAvailability = await DoctorAvailability.findByIdAndDelete(id);

        if (!doctorAvailability) {
            console.log('No Data Found.');

            return res.status(404).json({ message: 'No Data Found.', data: null });
        }

        console.log('Doctor Availability Deleted Successfully.', doctorAvailability);

        return res.status(200).json({ message: 'Doctor Availability Deleted Successfully.', data: doctorAvailability });

    } catch (error) {
        console.log('Error While Deleting Doctor Availability.', error);

        return res.status(500).json({ message: 'Error While Deleting Doctor Availability.', error: error.message });
    }
}

module.exports = { 
    registerDoctorAvailabilityController, 
    fetchAllDoctorAvailabilityController, 
    fetchSingleDoctorAvailabilityController, 
    editDoctorAvailabilityController, 
    deleteDoctorAvailabilityController 
};