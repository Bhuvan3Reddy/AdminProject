import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./admin-user.dto";
import { AdminUser } from "./admin-user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AdminUser)
    private readonly userModel: typeof AdminUser
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AdminUser> {
    return this.userModel.create(createUserDto);
  }
}
