import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";
import { GetFollowerListingService } from "./get-follower-listing.service";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.CREATOR)
@Controller()
export class GetFollowerListingController {
    constructor(private readonly getFollowerListingService: GetFollowerListingService) { }

    @Get('/follow')
    async GetFollowerListing(@Req() req: Request, @Query('offset') offset?: number, @Query('limit') limit?: number) {
        return this.getFollowerListingService.GetFollowerListing(req.user, offset, limit);
    }
}