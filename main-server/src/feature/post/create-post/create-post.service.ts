import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/user/user.entity";
import { CreatePostDto } from "./create-post.dto";
import { PostRepository } from "src/infrastructure/repository/post.repo";
import { RabbitMQService } from "src/infrastructure/rabbit-mq/rabbit-mq.service";
import { ExchangeNameEnum, RoutingKeyEnum } from "src/infrastructure/rabbit-mq/type-enum/rabbit-mq.enum";

@Injectable()
export class CreatePostService {
    constructor(
        private readonly postRepo: PostRepository,
        private readonly rabbitMQService: RabbitMQService
    ) { }

    async createPost(user: UserEntity, body: CreatePostDto) {
        const post = await this.postRepo.createPost({ user_uuid: user.uuid, ...body });

        await this.rabbitMQService.publishToExchange(
            ExchangeNameEnum.CREATOR_EXCHANGE,
            RoutingKeyEnum.CREATOR_POST_CREATED,
            post,
        );

        return {
            post: post,
            message: "Post Created Success"
        }
    }
}