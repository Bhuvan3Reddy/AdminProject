import { Role } from '../models/Role';
import { IRoleRepository } from '../interfaces/IRoleRepository';
export declare class RoleRepository implements IRoleRepository {
    findAll(): Promise<Role[]>;
    findById(roleId: string): Promise<Role | null>;
    create(data: Partial<Role>): Promise<Role>;
    update(roleId: string, data: Partial<Role>): Promise<Role | null>;
    delete(roleId: string): Promise<boolean>;
}
//# sourceMappingURL=RoleRepository.d.ts.map