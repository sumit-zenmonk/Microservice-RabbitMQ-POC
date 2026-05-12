import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";
import { CreateFollowerOfCreatorDto } from "./create-follower-of-creator.dto";
import { CreateFollowerOfCreatorService } from "./create-follower-of-creator.service";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.USER)
@Controller()
export class CreateFollowerOfCreatorController {
    constructor(private readonly createFollowerOfCreatorService: CreateFollowerOfCreatorService) { }

    @Post('/follow')
    async CreateFollowerOfCreator(@Req() req: Request, @Body() body: CreateFollowerOfCreatorDto) {
        return this.createFollowerOfCreatorService.createFollowerOfCreator(req.user, body);
    }
}