import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";
import { GetFollowingListingService } from "./get-following-listing.service";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.USER)
@Controller()
export class GetFollowingListingController {
    constructor(private readonly getFollowingListingService: GetFollowingListingService) { }

    @Get('/follow')
    async GetFollowingListing(@Req() req: Request, @Query('offset') offset?: number, @Query('limit') limit?: number) {
        return this.getFollowingListingService.GetFollowingListing(req.user, offset, limit);
    }
}