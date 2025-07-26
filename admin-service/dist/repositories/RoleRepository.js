"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const Role_1 = require("../models/Role");
class RoleRepository {
    async findAll() {
        return await Role_1.Role.findAll({
            order: [['roleName', 'ASC']],
        });
    }
    async findById(roleId) {
        return await Role_1.Role.findByPk(roleId);
    }
    async create(data) {
        return await Role_1.Role.create(data);
    }
    async update(roleId, data) {
        const role = await Role_1.Role.findByPk(roleId);
        if (!role) {
            return null;
        }
        await role.update(data);
        return role;
    }
    async delete(roleId) {
        const role = await Role_1.Role.findByPk(roleId);
        if (!role) {
            return false;
        }
        await role.destroy();
        return true;
    }
}
exports.RoleRepository = RoleRepository;
