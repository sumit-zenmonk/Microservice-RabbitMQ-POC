import { Module } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { LoginUserController } from "./login-user.controller";
import { LoginUserService } from "./login-user.service";
import { JwtHelperService } from "src/infrastructure/services/jwt.service";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";

@Module({
    imports: [],
    controllers: [LoginUserController],
    providers: [UserRepository, LoginUserService, JwtHelperService, BcryptService],
    exports: [],
})

export class LoginUserModule { }