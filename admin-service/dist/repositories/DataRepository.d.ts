import { Configuration } from '../models/Configuration';
import { IDataRepository } from '../interfaces/factory';
export declare class DataRepository implements IDataRepository {
    findAllByConfiguration(configId: number): Promise<{
        configuration: Configuration;
        data: any[];
    }>;
    findById(configId: number, recordId: number): Promise<any>;
    create(configId: number, recordData: Record<string, any>): Promise<any>;
    update(configId: number, recordId: number, recordData: Record<string, any>): Promise<any>;
    delete(configId: number, recordId: number): Promise<boolean>;
}
//# sourceMappingURL=DataRepository.d.ts.map