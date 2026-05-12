import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";
import { CreatePostService } from "./create-post.service";
import { CreatePostDto } from "./create-post.dto";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.CREATOR)
@Controller()
export class CreatePostController {
    constructor(private readonly createPostService: CreatePostService) { }

    @Post('/post')
    async CreatePost(@Req() req: Request, @Body() body: CreatePostDto) {
        return this.createPostService.createPost(req.user, body);
    }
}