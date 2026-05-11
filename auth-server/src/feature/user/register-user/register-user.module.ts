import { Module } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { RegisterUserController } from "./register-user.controller";
import { RegisterUserService } from "./register-user.service";
import { JwtHelperService } from "src/infrastructure/services/jwt.service";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";
import { RabbitMQService } from "src/infrastructure/rabbit-mq/rabbit-mq.service";

@Module({
    imports: [],
    controllers: [RegisterUserController],
    providers: [UserRepository, RegisterUserService, JwtHelperService, BcryptService, RabbitMQService],
    exports: [],
})

export class RegisterUserModule { }