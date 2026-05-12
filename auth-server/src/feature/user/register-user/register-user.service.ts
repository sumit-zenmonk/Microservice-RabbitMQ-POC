import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";
import { JwtHelperService } from "src/infrastructure/services/jwt.service";
import { RegisterUserDto } from "./register-user.dto";
import type { Request } from "express";
import { RabbitMQService } from "src/infrastructure/rabbit-mq/rabbit-mq.service";
import { ExchangeNameEnum, RoutingKeyEnum } from "src/infrastructure/rabbit-mq/type-enum/rabbit-mq.enum";

@Injectable()
export class RegisterUserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly jwtHelperService: JwtHelperService,
        private readonly rabbitMQService: RabbitMQService,
    ) { }

    async registerUser(req: Request, body: RegisterUserDto) {
        //check if already exists using this email
        const isUserExists = await this.userRepo.findByEmail(body.email);
        if (isUserExists.length) {
            throw new BadRequestException('User Already Exists with this Email');
        }

        //hashed password using bcrypt
        body.password = await this.bcryptService.hashPassword(body.password);

        //register user in DB
        const RegisteredUser = await this.userRepo.register(body);

        // generate token for accessing resources
        const token = await this.jwtHelperService.generateJwtToken(RegisteredUser);

        await this.rabbitMQService.publishToExchange(
            ExchangeNameEnum.USER_EXCHANGE,
            RoutingKeyEnum.USER_REGISTERED,
            RegisteredUser,
        );

        return {
            message: "Registered User",
            access_token: token,
            user: {
                name: RegisteredUser.name,
                email: RegisteredUser.email,
                role: RegisteredUser.role,
                uuid: RegisteredUser.uuid,
            }
        }
    }
}