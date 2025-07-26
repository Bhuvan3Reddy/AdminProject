"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationColumn = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Configuration_1 = require("./Configuration");
let ConfigurationColumn = class ConfigurationColumn extends sequelize_typescript_1.Model {
    configurationId;
    columnName;
    dataType;
    isPrimaryKey;
    isRequired;
    defaultValue;
    configuration;
};
exports.ConfigurationColumn = ConfigurationColumn;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ConfigurationColumn.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Configuration_1.Configuration),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: 'configuration_id',
    }),
    __metadata("design:type", Number)
], ConfigurationColumn.prototype, "configurationId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        field: 'column_name',
    }),
    __metadata("design:type", String)
], ConfigurationColumn.prototype, "columnName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: 'data_type',
    }),
    __metadata("design:type", String)
], ConfigurationColumn.prototype, "dataType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_primary_key',
    }),
    __metadata("design:type", Boolean)
], ConfigurationColumn.prototype, "isPrimaryKey", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_required',
    }),
    __metadata("design:type", Boolean)
], ConfigurationColumn.prototype, "isRequired", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        field: 'default_value',
    }),
    __metadata("design:type", String)
], ConfigurationColumn.prototype, "defaultValue", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], ConfigurationColumn.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], ConfigurationColumn.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Configuration_1.Configuration),
    __metadata("design:type", Configuration_1.Configuration)
], ConfigurationColumn.prototype, "configuration", void 0);
exports.ConfigurationColumn = ConfigurationColumn = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'configuration_columns',
        schema: 'admin_schema',
        timestamps: true,
    })
], ConfigurationColumn);
