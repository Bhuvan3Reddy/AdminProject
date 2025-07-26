import { Configuration } from '../models/Configuration';
import { ConfigurationColumn } from '../models/ConfigurationColumn';
import { IConfigurationService, IConfigurationRepository } from '../interfaces/factory';
export declare class ConfigurationService implements IConfigurationService {
    private configurationRepository;
    constructor(configurationRepository: IConfigurationRepository);
    getAllConfigurations(): Promise<Configuration[]>;
    getConfigurationById(id: number): Promise<Configuration>;
    createConfiguration(data: Partial<Configuration>, columns: Partial<ConfigurationColumn>[]): Promise<Configuration>;
    updateConfiguration(id: number, data: Partial<Configuration>, columns?: Partial<ConfigurationColumn>[]): Promise<Configuration>;
    deleteConfiguration(id: number): Promise<void>;
}
//# sourceMappingURL=ConfigurationService.d.ts.map