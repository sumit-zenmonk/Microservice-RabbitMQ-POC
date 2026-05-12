import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { GetCreatorPostListingService } from "./get-creator-post-listing.service";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.CREATOR)
@Controller()
export class GetCreatorPostListingController {
    constructor(private readonly getCreatorPostListingService: GetCreatorPostListingService) { }

    @Get('/post')
    async GetCreatorPostListing(@Req() req: Request, @Query('offset') offset?: number, @Query('limit') limit?: number) {
        return this.getCreatorPostListingService.getCreatorPostListingService(req.user, offset, limit);
    }
}