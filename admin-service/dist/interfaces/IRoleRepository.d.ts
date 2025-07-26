import { Role } from '../models/Role';
export interface IRoleRepository {
    findAll(): Promise<Role[]>;
    findById(roleId: string): Promise<Role | null>;
    create(data: Partial<Role>): Promise<Role>;
    update(roleId: string, data: Partial<Role>): Promise<Role | null>;
    delete(roleId: string): Promise<boolean>;
}
//# sourceMappingURL=IRoleRepository.d.ts.map