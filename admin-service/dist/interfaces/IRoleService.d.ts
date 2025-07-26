import { Role } from '../models/Role';
export interface IRoleService {
    getAllRoles(): Promise<Role[]>;
    getRoleById(roleId: string): Promise<Role>;
    createRole(data: Partial<Role>): Promise<Role>;
    updateRole(roleId: string, data: Partial<Role>): Promise<Role>;
    deleteRole(roleId: string): Promise<void>;
}
//# sourceMappingURL=IRoleService.d.ts.map