import { Model } from 'sequelize-typescript';
export declare class Role extends Model<Role> {
    roleId: string;
    roleName: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy?: string;
    modifiedDate: Date;
    isActive: boolean;
}
//# sourceMappingURL=Role.d.ts.map