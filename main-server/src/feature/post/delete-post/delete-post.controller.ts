import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";
import { DeletePostService } from "./delete-post.service";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.CREATOR)
@Controller()
export class DeletePostController {
    constructor(private readonly deletePostService: DeletePostService) { }

    @Delete("post/:post_uuid")
    async DeletePost(@Req() req: Request, @Param("post_uuid") post_uuid: string) {
        return this.deletePostService.deletePostService(post_uuid, req.user);
    }
}