"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
class RoleService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async getAllRoles() {
        return await this.roleRepository.findAll();
    }
    async getRoleById(roleId) {
        const role = await this.roleRepository.findById(roleId);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    }
    async createRole(data) {
        // Validate required fields
        if (!data.roleName || !data.createdBy) {
            throw new Error('Role name and created by are required');
        }
        // Check if role name already exists
        const existingRoles = await this.roleRepository.findAll();
        const roleExists = existingRoles.some(role => role.roleName && role.roleName.toLowerCase() === data.roleName.toLowerCase());
        if (roleExists) {
            throw new Error('Role name already exists');
        }
        return await this.roleRepository.create(data);
    }
    async updateRole(roleId, data) {
        // Check if role name already exists (exclude current role)
        if (data.roleName) {
            const existingRoles = await this.roleRepository.findAll();
            const roleExists = existingRoles.some(role => role.roleId !== roleId &&
                role.roleName && role.roleName.toLowerCase() === data.roleName.toLowerCase());
            if (roleExists) {
                throw new Error('Role name already exists');
            }
        }
        const updatedRole = await this.roleRepository.update(roleId, data);
        if (!updatedRole) {
            throw new Error('Role not found');
        }
        return updatedRole;
    }
    async deleteRole(roleId) {
        const deleted = await this.roleRepository.delete(roleId);
        if (!deleted) {
            throw new Error('Role not found');
        }
    }
}
exports.RoleService = RoleService;
