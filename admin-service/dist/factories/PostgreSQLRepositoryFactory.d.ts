import { IRepositoryFactory, IConfigurationRepository, IDataRepository, IRoleRepository, IBankDetailRepository } from '../interfaces/factory';
export declare class PostgreSQLRepositoryFactory implements IRepositoryFactory {
    createConfigurationRepository(): IConfigurationRepository;
    createDataRepository(): IDataRepository;
    createRoleRepository(): IRoleRepository;
    createBankDetailsRepository(): IBankDetailRepository;
}
//# sourceMappingURL=PostgreSQLRepositoryFactory.d.ts.map