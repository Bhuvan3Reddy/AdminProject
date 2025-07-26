import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AgentService } from "./agent.service";
import { ApiOperationSummary } from "../../decorators/api-operation.decorator";
import {
  ApiGetResponses,
  ApiPostResponses,
  ApiPostUpdateResponses,
} from "../../decorators/api-responses.decorator";
import { CreateOptionalQueryDto } from "../../decorators/queryoptinal.decorator";
import { CreateAgentDto, UpdateAgentDto } from "./agent.dto";
import { parseFindAllParams } from "../../utils/params-parse";
import { FindAllQueryDto } from "../../utils/params-query";
import { CreateQueryDto } from "../../decorators/query.decorator";
import { Agents } from "./agent.model";
import { ApiParamId } from "../../decorators/api-param.decorator";

@ApiTags("agents")
@Controller("agents")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  @ApiOperationSummary("Create new agent details")
  @ApiPostResponses()
  create(
    @Body() dto: CreateAgentDto,
    @Query() query: CreateOptionalQueryDto
  ): Promise<any> {
    const params = parseFindAllParams<any>(query.filters);
    return this.agentService.create(dto, params);
  }
  @Get()
  @ApiOperationSummary("Get all agent details")
  @ApiGetResponses()
  async findAll(@Query() query: FindAllQueryDto) {
    const params = parseFindAllParams<any>(
      query.filters,
      query.order,
      {
        page: query.page,
        limit: query.limit,
      },
      query.attributes
    );

    return this.agentService.findAll(params);
  }

  @Get("fetchById")
  @ApiOperationSummary("Get details by any column")
  @ApiGetResponses()
  findByUserId(@Query() query: CreateQueryDto): Promise<Agents> {
    const params = parseFindAllParams<any>(
      query.filters,
      "",
      null,
      query.attributes
    );
    return this.agentService.findOne(params);
  }

  @Put(":id")
  @ApiOperationSummary("Update agent details")
  @ApiParamId("id", "Agent details ID")
  @ApiPostUpdateResponses()
  update(@Param("id") id: number, @Body() dto: UpdateAgentDto): Promise<any> {
    return this.agentService.update(id, dto);
  }
}
