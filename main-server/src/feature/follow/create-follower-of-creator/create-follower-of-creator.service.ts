import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/user/user.entity";
import { CreateFollowerOfCreatorDto } from "./create-follower-of-creator.dto";
import { FollowRepository } from "src/infrastructure/repository/follow.repo";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RabbitMQService } from "src/infrastructure/rabbit-mq/rabbit-mq.service";
import { ExchangeNameEnum, RoutingKeyEnum } from "src/infrastructure/rabbit-mq/type-enum/rabbit-mq.enum";

@Injectable()
export class CreateFollowerOfCreatorService {
    constructor(
        private readonly followRepo: FollowRepository,
        private readonly userRepo: UserRepository,
        private readonly rabbitMQService: RabbitMQService
    ) { }

    async createFollowerOfCreator(user: UserEntity, body: CreateFollowerOfCreatorDto) {
        const isFollowerAUserNotAdmin = await this.userRepo.findByUuid(body.follower_uuid);
        const isFollowingAUserNotAdmin = await this.userRepo.findByUuid(body.following_uuid);

        if (isFollowerAUserNotAdmin?.role == UserRoleEnum.CREATOR) {
            throw new BadRequestException("Follower should be user not admin");
        }
        if (isFollowingAUserNotAdmin?.role == UserRoleEnum.USER) {
            throw new BadRequestException("Following should be admin not user");
        }

        const isFollowerExists = await this.followRepo.findByFollowerAndFollwoing(body.follower_uuid, body.following_uuid);
        if (isFollowerExists) {
            throw new BadRequestException("Already Followed Creator");
        }

        const follow = await this.followRepo.createFollowerBond(body);

        await this.rabbitMQService.publishToExchange(
            ExchangeNameEnum.CREATOR_EXCHANGE,
            RoutingKeyEnum.FOLLOW_CREATED,
            follow,
        );

        return {
            follow: follow,
            message: "Follow Bond created"
        }
    }
}