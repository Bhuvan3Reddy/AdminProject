import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBankDto, UpdateBankDto } from "./bank.dto";
import { UserBankDetails } from "./bank.model";
import { ErrorResponse, SuccessResponse } from "src/shared/api-response.dto";
import { BaseService, FindAllParams } from "../../services/base.service";

@Injectable()
export class BankService extends BaseService<UserBankDetails> {
  constructor(
    @InjectModel(UserBankDetails)
    private readonly bankModel: typeof UserBankDetails
  ) {
    super(bankModel);
  }

  //Create New Record
  async create(
    dto: CreateBankDto,
    params?: FindAllParams<UserBankDetails>
  ): Promise<SuccessResponse<UserBankDetails> | ErrorResponse> {
    return await super.save(
      {
        ...dto,
      },
      params
    );
  }

  //Update Existing Record
  async update(id: number | string, data: Partial<UpdateBankDto>) {
    return super.update(id, data);
  }

  async findAll(params?: FindAllParams<UserBankDetails>) {
    return super.findAll(params);
  }

  async findOne(
    params?: FindAllParams<UserBankDetails>
  ): Promise<UserBankDetails> {
    return super.findOne(params);
  }
}
