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
import { CreateBankDto, UpdateBankDto } from "./bank.dto";
import { BankService } from "./bank.service";
import { UserBankDetails } from "./bank.model";
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

@ApiTags("bank-details")
@Controller("bank-details")
// @UseGuards(AuthenticateTokenGuard)
// @ApiBearerAuth()
// @ApiCookieAuth()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @ApiOperationSummary("Create new bank details")
  @ApiPostResponses()
  create(
    @Body() dto: CreateBankDto,
    @Query() query: CreateOptionalQueryDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<any> {
    const params = parseFindAllParams<any>(
      query.filters,
      undefined,
      undefined,
      undefined
    );
    const bankData = {
      ...dto,
      createdBy:'Admin',
    };
    return this.bankService.create(bankData, params);
  }

  @Get()
  @ApiOperationSummary("Get all bank details")
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
    return this.bankService.findAll(params);
  }

  @Get("fetchById")
  @ApiOperationSummary("Get details by any column")
  @ApiGetResponses()
  findByUserId(
    @Query() query: CreateQueryDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<UserBankDetails> {
    const params = parseFindAllParams<any>(
      query.filters,
      query.order,
      query.page && query.limit
        ? { page: query.page, limit: query.limit }
        : null,
      query.attributes
    );
    return this.bankService.findOne(params);
  }

  @Put(":bankId")
  @ApiOperationSummary("Update bank details")
  @ApiParamId("bankId", "Bank details ID")
  @ApiPostUpdateResponses()
  update(
    @Param("bankId") bankId: string,
    @Body() dto: UpdateBankDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<any> {
    const updateData = {
      ...dto,
      modifiedBy:'Admin',
    };
    return this.bankService.update(bankId, updateData);
  }
}
