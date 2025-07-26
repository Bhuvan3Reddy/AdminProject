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
exports.BankDetails = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BankDetailsColumns_1 = require("./BankDetailsColumns");
let BankDetails = class BankDetails extends sequelize_typescript_1.Model {
    accountholdername;
    email;
    bankname;
    branchname;
    accountnumber;
    confirmaccountnumber;
    accounttype;
    currency;
    countrycode;
    phone;
    iban;
    swiftcode;
    address;
    columns;
};
exports.BankDetails = BankDetails;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], BankDetails.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: 'account_holder_name',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "accountholdername", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        field: 'bank_name',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "bankname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        field: 'branch_name',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "branchname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: 'account_number',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "accountnumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: 'confirm_account_number',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "confirmaccountnumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: 'account_type',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "accounttype", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "currency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: 'country_code',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "countrycode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "iban", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        field: 'swift_code',
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "swiftcode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: true,
    }),
    __metadata("design:type", String)
], BankDetails.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'created_at' }),
    __metadata("design:type", Date)
], BankDetails.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'updated_at' }),
    __metadata("design:type", Date)
], BankDetails.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => BankDetailsColumns_1.BankDetailColumn),
    __metadata("design:type", Array)
], BankDetails.prototype, "columns", void 0);
exports.BankDetails = BankDetails = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'bank_details',
        schema: 'admin_schema',
        timestamps: true,
    })
], BankDetails);
