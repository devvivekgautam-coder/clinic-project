const express = require('express');
const { registerController, loginController, fetchAllUserController, fetchSingleUserController, editUserController, deleteUserController, getMeController } = require('../../controllers/user/user.controller');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/me', authMiddleware, getMeController);

router.get('/fetch', authMiddleware, roleMiddleware('admin'), fetchAllUserController);

router.get('/fetch/:id', authMiddleware, roleMiddleware('admin'), fetchSingleUserController);

router.put('/edit/:id', authMiddleware, roleMiddleware('admin'), editUserController);

router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), deleteUserController);

module.exports = router;