import { Model } from 'sequelize-typescript';
import { BankDetails } from './BankDetails';
export declare class BankDetailColumn extends Model<BankDetailColumn> {
    id: number;
    bankDetailId: number;
    columnName: string;
    dataType: string;
    isPrimaryKey: boolean;
    isRequired: boolean;
    defaultValue?: string;
    createdAt: Date;
    updatedAt: Date;
    bankDetails: BankDetails;
}
//# sourceMappingURL=BankDetailsColumns.d.ts.map