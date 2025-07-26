import { Model } from 'sequelize-typescript';
import { ConfigurationColumn } from './ConfigurationColumn';
export declare class Configuration extends Model<Configuration> {
    id: number;
    name: string;
    tableName: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    columns: ConfigurationColumn[];
}
//# sourceMappingURL=Configuration.d.ts.map