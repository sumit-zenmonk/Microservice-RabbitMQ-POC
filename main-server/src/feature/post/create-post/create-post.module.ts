import { Module } from "@nestjs/common";
import { CreatePostController } from "./create-post.controller";
import { CreatePostService } from "./create-post.service";
import { PostRepository } from "src/infrastructure/repository/post.repo";

@Module({
    imports: [],
    controllers: [CreatePostController],
    providers: [CreatePostService, PostRepository],
    exports: [],
})

export class CreatePostModule { }