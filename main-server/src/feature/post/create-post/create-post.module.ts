import { Module } from "@nestjs/common";
import { CreatePostController } from "./create-post.controller";
import { CreatePostService } from "./create-post.service";
import { PostRepository } from "src/infrastructure/repository/post.repo";
import { RabbitMQService } from "src/infrastructure/rabbit-mq/rabbit-mq.service";

@Module({
    imports: [],
    controllers: [CreatePostController],
    providers: [CreatePostService, PostRepository, RabbitMQService],
    exports: [],
})

export class CreatePostModule { }