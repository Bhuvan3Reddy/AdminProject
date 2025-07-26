import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePlayerDto, UpdatePlayerDto } from "./player.dto";
import { CreatePlayerDetails } from "./player.model";
import { ErrorResponse, SuccessResponse } from "src/shared/api-response.dto";
import { BaseService, FindAllParams } from "../../services/base.service";

@Injectable()
export class PlayerService extends BaseService<CreatePlayerDetails> {
  constructor(
    @InjectModel(CreatePlayerDetails)
    private readonly playerModel: typeof CreatePlayerDetails
  ) {
    super(playerModel);
  }

  //Create New Record
  async create(
    dto: CreatePlayerDto,
    params?: FindAllParams<CreatePlayerDetails>
  ): Promise<SuccessResponse<CreatePlayerDetails> | ErrorResponse> {
    return await super.save(
      {
        ...dto,
        isActive: dto.isActive ?? true,
      },
      params
    );
  }
  //Update Existing Record
  async update(id: number | string, data: Partial<UpdatePlayerDto>) {
    return super.update(id, data);
  }

  async findAll(params?: FindAllParams<CreatePlayerDetails>) {
    return super.findAll(params);
  }

  async findOne(
    params?: FindAllParams<CreatePlayerDetails>
  ): Promise<CreatePlayerDetails> {
    return super.findOne(params);
  }
}
