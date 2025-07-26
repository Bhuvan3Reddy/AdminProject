import { IServiceFactory, IConfigurationService, IDataService, IRoleService, IRepositoryFactory, IBankDetailService } from '../interfaces/factory';
export declare class ServiceFactory implements IServiceFactory {
    private repositoryFactory;
    constructor(repositoryFactory: IRepositoryFactory);
    createConfigurationService(): IConfigurationService;
    createDataService(): IDataService;
    createRoleService(): IRoleService;
    createBankDetailService(): IBankDetailService;
}
//# sourceMappingURL=ServiceFactory.d.ts.map