const express = require('express');
const {createRoleController, fetchRoleController, editRoleController, deleteRoleController} = require('../../controllers/roles/role.controller');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/auth.middleware');

const roleRouter = express.Router();

roleRouter.post('/create',authMiddleware, roleMiddleware('admin'), createRoleController);

roleRouter.get('/fetch',authMiddleware, roleMiddleware('admin'), fetchRoleController);

roleRouter.put('/edit/:id',authMiddleware, roleMiddleware('admin'), editRoleController);

roleRouter.delete('/delete/:id',authMiddleware, roleMiddleware('admin'), deleteRoleController);

module.exports = roleRouter;