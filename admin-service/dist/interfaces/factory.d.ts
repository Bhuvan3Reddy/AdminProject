import { Configuration } from '../models/Configuration';
import { ConfigurationColumn } from '../models/ConfigurationColumn';
import { BankDetailColumn } from '../models/BankDetailsColumns';
import { BankDetails } from '../models/BankDetails';
import { Role } from '../models/Role';
export interface IRepositoryFactory {
    createConfigurationRepository(): IConfigurationRepository;
    createDataRepository(): IDataRepository;
    createRoleRepository(): IRoleRepository;
    createBankDetailsRepository(): IBankDetailRepository;
}
export interface IConfigurationRepository {
    findAll(): Promise<Configuration[]>;
    findById(id: number): Promise<Configuration | null>;
    create(data: Partial<Configuration>): Promise<Configuration>;
    update(id: number, data: Partial<Configuration>): Promise<Configuration | null>;
    delete(id: number): Promise<boolean>;
}
export interface IBankDetailRepository {
    create(data: Partial<BankDetails>): Promise<BankDetails>;
}
export interface IDataRepository {
    findAllByConfiguration(configId: number): Promise<{
        configuration: Configuration;
        data: any[];
    }>;
    findById(configId: number, recordId: number): Promise<any>;
    create(configId: number, recordData: Record<string, any>): Promise<any>;
    update(configId: number, recordId: number, recordData: Record<string, any>): Promise<any>;
    delete(configId: number, recordId: number): Promise<boolean>;
}
export interface IRoleRepository {
    findAll(): Promise<Role[]>;
    findById(roleId: string): Promise<Role | null>;
    create(data: Partial<Role>): Promise<Role>;
    update(roleId: string, data: Partial<Role>): Promise<Role | null>;
    delete(roleId: string): Promise<boolean>;
}
export interface IConfigurationService {
    getAllConfigurations(): Promise<Configuration[]>;
    getConfigurationById(id: number): Promise<Configuration>;
    createConfiguration(data: Partial<Configuration>, columns: Partial<ConfigurationColumn>[]): Promise<Configuration>;
    updateConfiguration(id: number, data: Partial<Configuration>, columns?: Partial<ConfigurationColumn>[]): Promise<Configuration>;
    deleteConfiguration(id: number): Promise<void>;
}
export interface IDataService {
    getConfigurationData(configId: number): Promise<{
        configuration: Configuration;
        data: any[];
    }>;
    getDataRecord(configId: number, recordId: number): Promise<any>;
    createDataRecord(configId: number, recordData: Record<string, any>): Promise<any>;
    updateDataRecord(configId: number, recordId: number, recordData: Record<string, any>): Promise<any>;
    deleteDataRecord(configId: number, recordId: number): Promise<void>;
}
export interface IRoleService {
    getAllRoles(): Promise<Role[]>;
    getRoleById(roleId: string): Promise<Role>;
    createRole(data: Partial<Role>): Promise<Role>;
    updateRole(roleId: string, data: Partial<Role>): Promise<Role>;
    deleteRole(roleId: string): Promise<void>;
}
export interface IBankDetailService {
    createBankDetail(data: Partial<BankDetails>, columns: Partial<BankDetailColumn>[]): Promise<BankDetails>;
}
export interface IServiceFactory {
    createConfigurationService(): IConfigurationService;
    createDataService(): IDataService;
    createRoleService(): IRoleService;
    createBankDetailService(): IBankDetailService;
}
//# sourceMappingURL=factory.d.ts.map