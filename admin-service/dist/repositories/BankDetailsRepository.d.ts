import { IBankDetailRepository } from "../interfaces/factory";
import { BankDetails } from "../models/BankDetails";
export declare class BankDetailRepository implements IBankDetailRepository {
    create(data: Partial<BankDetails>): Promise<BankDetails>;
}
//# sourceMappingURL=BankDetailsRepository.d.ts.map