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
exports.BankDetailColumn = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BankDetails_1 = require("./BankDetails");
let BankDetailColumn = class BankDetailColumn extends sequelize_typescript_1.Model {
    bankDetailId;
    columnName;
    dataType;
    isPrimaryKey;
    isRequired;
    defaultValue;
    bankDetails;
};
exports.BankDetailColumn = BankDetailColumn;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], BankDetailColumn.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => BankDetails_1.BankDetails),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: 'bank_detail_id',
    }),
    __metadata("design:type", Number)
], BankDetailColumn.prototype, "bankDetailId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        field: 'column_name',
    }),
    __metadata("design:type", String)
], BankDetailColumn.prototype, "columnName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: 'data_type',
    }),
    __metadata("design:type", String)
], BankDetailColumn.prototype, "dataType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_primary_key',
    }),
    __metadata("design:type", Boolean)
], BankDetailColumn.prototype, "isPrimaryKey", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_required',
    }),
    __metadata("design:type", Boolean)
], BankDetailColumn.prototype, "isRequired", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        field: 'default_value',
    }),
    __metadata("design:type", String)
], BankDetailColumn.prototype, "defaultValue", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'created_at' }),
    __metadata("design:type", Date)
], BankDetailColumn.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'updated_at' }),
    __metadata("design:type", Date)
], BankDetailColumn.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => BankDetails_1.BankDetails),
    __metadata("design:type", BankDetails_1.BankDetails)
], BankDetailColumn.prototype, "bankDetails", void 0);
exports.BankDetailColumn = BankDetailColumn = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'bank_detail_columns',
        schema: 'admin_schema',
        timestamps: true,
    })
], BankDetailColumn);
