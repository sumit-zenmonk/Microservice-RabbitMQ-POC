import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";
import { DeleteFollowerOfCreatorService } from "./delete-follower-of-creator.service";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.USER)
@Controller()
export class DeleteFollowerOfCreatorController {
    constructor(private readonly deleteFollowerOfCreatorService: DeleteFollowerOfCreatorService) { }

    @Delete("follow/:follow_uuid")
    async DeleteFollowerOfCreator(@Req() req: Request, @Param("follow_uuid") follow_uuid: string) {
        return this.deleteFollowerOfCreatorService.deleteFollowerOfCreatorService(follow_uuid, req.user);
    }
}