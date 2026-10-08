const multer = require('multer');

const patientStorage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './uploads/patients');
    },
    filename: (req, file, next) => {
        let filename = Date.now() + '-' + file.originalname;
        next(null, filename);
    }
});

const doctorStorage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './uploads/doctors');
    },
    filename: (req, file, next) => {
        let filename = Date.now() + '-' + file.originalname;
        next(null, filename);
    }
});

const uploadPatient = multer({ storage: patientStorage });
const uploadDoctor = multer({ storage: doctorStorage });

module.exports = { uploadPatient, uploadDoctor };