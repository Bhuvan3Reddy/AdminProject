import { Injectable } from "@nestjs/common";
import { CreateAgentDto, UpdateAgentDto } from "./agent.dto";
import { Agents } from "./agent.model";
import { InjectModel } from "@nestjs/sequelize";
import { ErrorResponse, SuccessResponse } from "../../shared/api-response.dto";
import { BaseService, FindAllParams } from "../../services/base.service";
import { HashService } from "../../services/hash.service";

@Injectable()
export class AgentService extends BaseService<Agents> {
  constructor(
    @InjectModel(Agents)
    private readonly agentModel: typeof Agents,
    private hashService: HashService
  ) {
    super(agentModel);
  }

  //Create New Record
  async create(
    dto: CreateAgentDto,
    params?: FindAllParams<Agents>
  ): Promise<SuccessResponse<Agents> | ErrorResponse> {
    const hashedPassword = await this.hashService.hashPassword(dto.password);
    return await super.save(
      {
        ...dto,
        password: hashedPassword,
      },
      params
    );
  }

  //Update Existing Record
  async update(id: number | string, data: Partial<UpdateAgentDto>) {
    if ("password" in data) {
      if (data.password) {
        data.password = await this.hashService.hashPassword(data.password);
      } else {
        delete data.password;
      }
    }
    return super.update(id, data);
  }

  async findAll(params?: FindAllParams<Agents>) {
    return super.findAll(params);
  }

  async findOne(params?: FindAllParams<Agents>): Promise<Agents> {
    return super.findOne(params);
  }
}
