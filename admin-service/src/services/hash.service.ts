// auth/hash.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
  private readonly saltRounds: number;
  private readonly pepper: string;

  constructor(private configService: ConfigService) {
    this.saltRounds = +this.configService.get<string>(
      "BCRYPT_SALT_ROUNDS",
      "10"
    );
    this.pepper = this.configService.get<string>("BCRYPT_PEPPER", "");
  }

  async hashPassword(password: string): Promise<string> {
    const salted = password + this.pepper;
    return await bcrypt.hash(salted, this.saltRounds);
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    const salted = password + this.pepper;
    return await bcrypt.compare(salted, hashed);
  }
}
