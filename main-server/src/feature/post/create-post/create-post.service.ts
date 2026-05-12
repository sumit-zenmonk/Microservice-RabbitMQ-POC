import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/user/user.entity";
import { CreatePostDto } from "./create-post.dto";
import { PostRepository } from "src/infrastructure/repository/post.repo";

@Injectable()
export class CreatePostService {
    constructor(
        private readonly postRepo: PostRepository
    ) { }

    async createPost(user: UserEntity, body: CreatePostDto) {
        const post = await this.postRepo.createPost({ user_uuid: user.uuid, ...body });

        return {
            post: post,
            message: "Post Created Success"
        }
    }
}