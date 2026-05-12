import { Module } from "@nestjs/common";
import { DeletePostController } from "./delete-post.controller";
import { DeletePostService } from "./delete-post.service";
import { PostRepository } from "src/infrastructure/repository/post.repo";

@Module({
    imports: [],
    controllers: [DeletePostController],
    providers: [DeletePostService, PostRepository],
    exports: [],
})

export class DeletePostModule { }