import { Module } from "@nestjs/common";
import { GetUserPostListingService } from "./get-user-post-listing.service";
import { GetUserPostListingController } from "./get-user-post-listing.controller";
import { PostRepository } from "src/infrastructure/repository/post.repo";

@Module({
    imports: [],
    controllers: [GetUserPostListingController],
    providers: [GetUserPostListingService, PostRepository],
    exports: [],
})

export class GetUserPostListingModule { }