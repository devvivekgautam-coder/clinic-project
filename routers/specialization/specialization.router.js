const express = require('express');
const {registerSpecializationController, fetchAllSpecializationController, editSpecializationController, deleteSpecializationController, fetchSingleSpecializationController} = require('../../controllers/specialization/specialization.controller');

const router = express.Router();

router.post('/register', registerSpecializationController);

router.get('/fetch', fetchAllSpecializationController);

router.get('/fetch/:id', fetchSingleSpecializationController);

router.put('/edit/:id', editSpecializationController);

router.delete('/delete/:id', deleteSpecializationController);

module.exports = router;