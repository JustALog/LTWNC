import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user";
import { CreateUserPayload } from "../types/user";

@Injectable()
export class AuthService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async register(data: CreateUserPayload) {
    const existing = await UserModel.findByUsername(data.username);
    if (existing) {
      throw new UnauthorizedException("Username already exists");
    }
    const user = await UserModel.create(data);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async login(username: string, password: string) {
    const user = await UserModel.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at,
      },
    };
  }
}
