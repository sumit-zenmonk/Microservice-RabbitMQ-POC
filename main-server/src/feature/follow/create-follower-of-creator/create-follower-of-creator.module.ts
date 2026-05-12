import { Module } from "@nestjs/common";
import { CreateFollowerOfCreatorService } from "./create-follower-of-creator.service";
import { CreateFollowerOfCreatorController } from "./create-follower-of-creator.controller";
import { FollowRepository } from "src/infrastructure/repository/follow.repo";
import { UserRepository } from "src/infrastructure/repository/user.repo";

@Module({
    imports: [],
    controllers: [CreateFollowerOfCreatorController],
    providers: [CreateFollowerOfCreatorService, FollowRepository, UserRepository],
    exports: [],
})

export class CreateFollowerOfCreatorModule { }