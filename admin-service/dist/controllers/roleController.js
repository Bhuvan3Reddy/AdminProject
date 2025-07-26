"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const RoleRepository_1 = require("../repositories/RoleRepository");
const RoleService_1 = require("../services/RoleService");
// Initialize repository and service
const roleRepository = new RoleRepository_1.RoleRepository();
const roleService = new RoleService_1.RoleService(roleRepository);
const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllRoles = getAllRoles;
const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await roleService.getRoleById(id);
        res.json(role);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRoleById = getRoleById;
const createRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        // Validate required fields
        if (!roleName) {
            return res.status(400).json({ error: 'Role name is required' });
        }
        // Get user from request (assume it's set by auth middleware)
        const createdBy = req.user?.email || req.user?.id || 'system';
        const role = await roleService.createRole({
            roleName,
            createdBy,
            modifiedBy: createdBy,
        });
        res.status(201).json(role);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json({ error: 'Role name already exists' });
            }
            if (error.message.includes('required')) {
                return res.status(400).json({ error: error.message });
            }
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createRole = createRole;
const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName, isActive } = req.body;
        // Get user from request (assume it's set by auth middleware)
        const modifiedBy = req.user?.email || req.user?.id || 'system';
        const updateData = { modifiedBy };
        if (roleName !== undefined)
            updateData.roleName = roleName;
        if (isActive !== undefined)
            updateData.isActive = isActive;
        const role = await roleService.updateRole(id, updateData);
        res.json(role);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Role not found') {
                return res.status(404).json({ error: 'Role not found' });
            }
            if (error.message.includes('already exists')) {
                return res.status(409).json({ error: 'Role name already exists' });
            }
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateRole = updateRole;
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        await roleService.deleteRole(id);
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Role not found') {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteRole = deleteRole;
