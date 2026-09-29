const express = require('express');
const createRoleController = require('../../controllers/roles/role.controller');

const roleRouter = express.Router();

roleRouter.post('/create', createRoleController);

module.exports = roleRouter;