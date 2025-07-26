import { Role } from '../models/Role';
import { IRoleService } from '../interfaces/IRoleService';
import { IRoleRepository } from '../interfaces/IRoleRepository';
export declare class RoleService implements IRoleService {
    private roleRepository;
    constructor(roleRepository: IRoleRepository);
    getAllRoles(): Promise<Role[]>;
    getRoleById(roleId: string): Promise<Role>;
    createRole(data: Partial<Role>): Promise<Role>;
    updateRole(roleId: string, data: Partial<Role>): Promise<Role>;
    deleteRole(roleId: string): Promise<void>;
}
//# sourceMappingURL=RoleService.d.ts.map