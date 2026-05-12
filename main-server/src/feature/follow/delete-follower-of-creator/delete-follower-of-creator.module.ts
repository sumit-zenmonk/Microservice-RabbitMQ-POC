import { Module } from "@nestjs/common";
import { FollowRepository } from "src/infrastructure/repository/follow.repo";
import { DeleteFollowerOfCreatorController } from "./delete-follower-of-creator.controller";
import { DeleteFollowerOfCreatorService } from "./delete-follower-of-creator.service";

@Module({
    imports: [],
    controllers: [DeleteFollowerOfCreatorController],
    providers: [DeleteFollowerOfCreatorService, FollowRepository],
    exports: [],
})

export class DeleteFollowerOfCreatorModule { }