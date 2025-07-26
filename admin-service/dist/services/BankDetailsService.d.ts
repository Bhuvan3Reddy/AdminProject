import { BankDetails } from '../models/BankDetails';
import { BankDetailColumn } from '../models/BankDetailsColumns';
import { IBankDetailService, IBankDetailRepository } from '../interfaces/factory';
export declare class BankDetailService implements IBankDetailService {
    private bankDetailRepository;
    constructor(bankDetailRepository: IBankDetailRepository);
    createBankDetail(data: Partial<BankDetails>, columns: Partial<BankDetailColumn>[]): Promise<BankDetails>;
}
//# sourceMappingURL=BankDetailsService.d.ts.map