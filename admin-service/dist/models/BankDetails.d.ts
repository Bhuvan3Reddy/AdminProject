import { Model } from 'sequelize-typescript';
import { BankDetailColumn } from './BankDetailsColumns';
export declare class BankDetails extends Model<BankDetails> {
    id: number;
    accountholdername: string;
    email: string;
    bankname: string;
    branchname: string;
    accountnumber: string;
    confirmaccountnumber: string;
    accounttype: string;
    currency: string;
    countrycode: string;
    phone: string;
    iban: string;
    swiftcode: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    columns: BankDetailColumn[];
}
//# sourceMappingURL=BankDetails.d.ts.map