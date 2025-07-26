"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Configuration_1 = require("./Configuration");
const ConfigurationColumn_1 = require("./ConfigurationColumn");
const Role_1 = require("./Role");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize(process.env.DATABASE_ADMIN_URL, {
    dialect: 'postgres',
    models: [Configuration_1.Configuration, ConfigurationColumn_1.ConfigurationColumn, Role_1.Role],
    logging: false,
    schema: 'admin_schema',
});
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
    }
    catch (error) {
        process.exit(1);
    }
};
exports.initializeDatabase = initializeDatabase;
exports.default = sequelize;
