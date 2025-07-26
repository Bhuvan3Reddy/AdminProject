import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import { CreateUserDto } from "./admin-user.dto";
import { UserService } from "./admin-user.service";
import { AdminUser } from "./admin-user.model";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: AdminUser })
  create(@Body() dto: CreateUserDto): Promise<AdminUser> {
    return this.userService.create(dto);
  }
}
