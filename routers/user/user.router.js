const express = require('express');
const { registerController, loginController, fetchAllUserController, fetchSingleUserController, editUserController, deleteUserController } = require('../../controllers/user/user.controller');

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/fetch', fetchAllUserController);

router.get('/fetch/:id', fetchSingleUserController);

router.put('/edit/:id', editUserController);

router.delete('/delete/:id', deleteUserController);

module.exports = router;