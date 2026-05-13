import { Module } from "@nestjs/common";
import { FollowRepository } from "src/infrastructure/repository/follow.repo";
import { DeleteFollowerOfCreatorController } from "./delete-follower-of-creator.controller";
import { DeleteFollowerOfCreatorService } from "./delete-follower-of-creator.service";
import { RabbitMQService } from "src/infrastructure/rabbit-mq/rabbit-mq.service";

@Module({
    imports: [],
    controllers: [DeleteFollowerOfCreatorController],
    providers: [DeleteFollowerOfCreatorService, FollowRepository, RabbitMQService],
    exports: [],
})

export class DeleteFollowerOfCreatorModule { }