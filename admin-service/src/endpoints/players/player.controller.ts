import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiCookieAuth } from "@nestjs/swagger";
import { CreatePlayerDto, UpdatePlayerDto } from "./player.dto";
import { PlayerService } from "./player.service";
import { CreatePlayerDetails } from "./player.model";
import { ApiOperationSummary } from "../../decorators/api-operation.decorator";
import { ApiPostResponses } from "../../decorators/api-responses.decorator";
import { ApiGetResponses } from "../../decorators/api-responses.decorator";
import { ApiPostUpdateResponses } from "../../decorators/api-responses.decorator";
import { ApiParamId } from "../../decorators/api-param.decorator";
import { parseFindAllParams } from "../../utils/params-parse";
import { CreateOptionalQueryDto } from "../../decorators/queryoptinal.decorator";
import { CreateQueryDto } from "../../decorators/query.decorator";
import { CurrentUser } from "../../decorators/auth.decorator";
import { AuthenticateTokenGuard } from "../../guards/auth.guard";
import { AuthenticatedUser } from "../auth/auth.interface";
import { FindAllQueryDto } from "../../utils/params-query";

@ApiTags("player-details")
@Controller("player-details")
// @UseGuards(AuthenticateTokenGuard)
// @ApiBearerAuth()
// @ApiCookieAuth()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiOperationSummary("Create new player details")
  @ApiPostResponses()
  create(
    @Body() dto: CreatePlayerDto,
    @Query() query: CreateOptionalQueryDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<any> {
    const params = parseFindAllParams<any>(
      query.filters,
      undefined,
      undefined,
      undefined
    );
    const playerData = {
      ...dto,
      createdBy:'Admin',//user.email
    };
    return this.playerService.create(playerData, params);
  }
  @Get()
  @ApiOperationSummary("Get all player details")
  @ApiGetResponses()
  async findAll(
    @Query() query: FindAllQueryDto,
    @CurrentUser() user: AuthenticatedUser
  ) {
    const params = parseFindAllParams<any>(
      query.filters,
      query.order,
      {
        page: query.page,
        limit: query.limit,
      },
      query.attributes
    );
    return this.playerService.findAll(params);
  }

  @Get("fetchById")
  @ApiOperationSummary("Get details by any column")
  @ApiGetResponses()
  findByUserId(
    @Query() query: CreateQueryDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<CreatePlayerDetails> {
    const params = parseFindAllParams<any>(
      query.filters,
      query.order,
      query.page && query.limit
        ? { page: query.page, limit: query.limit }
        : null,
      query.attributes
    );
    return this.playerService.findOne(params);
  }

  @Put(":userId")
  @ApiOperationSummary("Update player details")
  @ApiParamId("userId", "Player details ID")
  @ApiPostUpdateResponses()
  update(
    @Param("userId") userId: string,
    @Body() dto: UpdatePlayerDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<any> {
    const updateData = {
      ...dto,
      modifiedBy:'Admin',
    };
    return this.playerService.update(userId, updateData);
  }
}
