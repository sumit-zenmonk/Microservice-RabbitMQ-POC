import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { GetUserPostListingService } from "./get-user-post-listing.service";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.USER)
@Controller()
export class GetUserPostListingController {
    constructor(private readonly getUserPostListingService: GetUserPostListingService) { }

    @Get('/post')
    async GetUserPostListing(@Req() req: Request, @Query('offset') offset?: number, @Query('limit') limit?: number) {
        return this.getUserPostListingService.getUserPostListingService(req.user, offset, limit);
    }
}