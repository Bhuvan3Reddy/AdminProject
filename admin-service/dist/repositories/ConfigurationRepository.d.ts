import { Configuration } from '../models/Configuration';
import { IConfigurationRepository } from '../interfaces/factory';
export declare class ConfigurationRepository implements IConfigurationRepository {
    findAll(): Promise<Configuration[]>;
    findById(id: number): Promise<Configuration | null>;
    create(data: Partial<Configuration>): Promise<Configuration>;
    update(id: number, data: Partial<Configuration>): Promise<Configuration | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=ConfigurationRepository.d.ts.map