"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRepository = void 0;
const Configuration_1 = require("../models/Configuration");
const ConfigurationColumn_1 = require("../models/ConfigurationColumn");
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../models/database"));
class DataRepository {
    async findAllByConfiguration(configId) {
        const configuration = await Configuration_1.Configuration.findByPk(configId, {
            include: [ConfigurationColumn_1.ConfigurationColumn],
        });
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        const tableName = `admin_schema.${configuration.tableName}`;
        const data = await database_1.default.query(`SELECT * FROM ${tableName} ORDER BY created_at DESC`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        return { configuration, data };
    }
    async findById(configId, recordId) {
        const configuration = await Configuration_1.Configuration.findByPk(configId);
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        const tableName = `admin_schema.${configuration.tableName}`;
        const query = `SELECT * FROM ${tableName} WHERE id = $1`;
        const [record] = await database_1.default.query(query, {
            bind: [recordId],
            type: sequelize_1.QueryTypes.SELECT,
        });
        return record;
    }
    async create(configId, recordData) {
        const configuration = await Configuration_1.Configuration.findByPk(configId, {
            include: [ConfigurationColumn_1.ConfigurationColumn],
        });
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        const tableName = `admin_schema.${configuration.tableName}`;
        const columns = Object.keys(recordData).filter(key => key !== 'id');
        const values = columns.map(col => recordData[col]);
        const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
        const query = `
      INSERT INTO ${tableName} (${columns.join(', ')}, created_at, updated_at)
      VALUES (${placeholders}, NOW(), NOW())
      RETURNING *
    `;
        const [newRecord] = await database_1.default.query(query, {
            bind: values,
            type: sequelize_1.QueryTypes.INSERT,
        });
        return newRecord;
    }
    async update(configId, recordId, recordData) {
        const configuration = await Configuration_1.Configuration.findByPk(configId);
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        const tableName = `admin_schema.${configuration.tableName}`;
        const columns = Object.keys(recordData).filter(key => key !== 'id');
        const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
        const values = columns.map(col => recordData[col]);
        const query = `
      UPDATE ${tableName}
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${columns.length + 1}
      RETURNING *
    `;
        const [updatedRecord] = await database_1.default.query(query, {
            bind: [...values, recordId],
            type: sequelize_1.QueryTypes.UPDATE,
        });
        return updatedRecord;
    }
    async delete(configId, recordId) {
        const configuration = await Configuration_1.Configuration.findByPk(configId);
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        const tableName = `admin_schema.${configuration.tableName}`;
        const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
        const result = await database_1.default.query(query, {
            bind: [recordId],
            type: sequelize_1.QueryTypes.DELETE,
        });
        // result[0] contains the deleted rows
        const [rows] = result;
        return Array.isArray(rows) && rows.length > 0;
    }
}
exports.DataRepository = DataRepository;
