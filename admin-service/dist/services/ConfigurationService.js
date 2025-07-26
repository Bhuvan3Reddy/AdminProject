"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const Configuration_1 = require("../models/Configuration");
const ConfigurationColumn_1 = require("../models/ConfigurationColumn");
const database_1 = __importDefault(require("../models/database"));
class ConfigurationService {
    configurationRepository;
    constructor(configurationRepository) {
        this.configurationRepository = configurationRepository;
    }
    async getAllConfigurations() {
        return await this.configurationRepository.findAll();
    }
    async getConfigurationById(id) {
        const configuration = await this.configurationRepository.findById(id);
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        return configuration;
    }
    async createConfiguration(data, columns) {
        const transaction = await database_1.default.transaction();
        try {
            // Validate columns
            const primaryKeyColumns = columns.filter(col => col.isPrimaryKey);
            if (primaryKeyColumns.length === 0) {
                throw new Error('At least one primary key column is required');
            }
            // Check for duplicate column names
            const columnNames = columns.map(col => col.columnName);
            const uniqueNames = new Set(columnNames);
            if (columnNames.length !== uniqueNames.size) {
                throw new Error('Duplicate column names are not allowed');
            }
            // Create configuration
            const configuration = await Configuration_1.Configuration.create(data, { transaction });
            // Create columns
            const columnData = columns.map(col => ({
                configurationId: configuration.id,
                columnName: col.columnName,
                dataType: col.dataType,
                isPrimaryKey: col.isPrimaryKey || false,
                isRequired: col.isRequired || false,
                defaultValue: col.defaultValue || null,
            }));
            await ConfigurationColumn_1.ConfigurationColumn.bulkCreate(columnData, { transaction });
            await transaction.commit();
            // Return the created configuration with columns
            return await this.getConfigurationById(configuration.id);
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async updateConfiguration(id, data, columns) {
        const transaction = await database_1.default.transaction();
        try {
            const configuration = await Configuration_1.Configuration.findByPk(id);
            if (!configuration) {
                throw new Error('Configuration not found');
            }
            // Validate columns if provided
            if (columns) {
                const primaryKeyColumns = columns.filter(col => col.isPrimaryKey);
                if (primaryKeyColumns.length === 0) {
                    throw new Error('At least one primary key column is required');
                }
                const columnNames = columns.map(col => col.columnName);
                const uniqueNames = new Set(columnNames);
                if (columnNames.length !== uniqueNames.size) {
                    throw new Error('Duplicate column names are not allowed');
                }
            }
            // Update configuration
            await configuration.update(data, { transaction });
            // Update columns if provided
            if (columns) {
                // Delete existing columns
                await ConfigurationColumn_1.ConfigurationColumn.destroy({
                    where: { configurationId: id },
                    transaction,
                });
                // Create new columns
                const columnData = columns.map(col => ({
                    configurationId: id,
                    columnName: col.columnName,
                    dataType: col.dataType,
                    isPrimaryKey: col.isPrimaryKey || false,
                    isRequired: col.isRequired || false,
                    defaultValue: col.defaultValue || null,
                }));
                await ConfigurationColumn_1.ConfigurationColumn.bulkCreate(columnData, { transaction });
            }
            await transaction.commit();
            return await this.getConfigurationById(id);
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async deleteConfiguration(id) {
        const transaction = await database_1.default.transaction();
        try {
            const configuration = await Configuration_1.Configuration.findByPk(id);
            if (!configuration) {
                throw new Error('Configuration not found');
            }
            await configuration.destroy({ transaction });
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
exports.ConfigurationService = ConfigurationService;
