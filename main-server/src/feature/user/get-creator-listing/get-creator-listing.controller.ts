import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { GetCreatorListingService } from "./get-creator-listing.service";
import { Roles } from "src/infrastructure/guard/user/user.role.decorator";
import { UserRoleEnum } from "src/domain/user/user.enum";
import { RolesGuard } from "src/infrastructure/guard/user/user.role.guard";

@UseGuards(RolesGuard)
@Roles(UserRoleEnum.USER)
@Controller()
export class GetCreatorListingController {
    constructor(private readonly getCreatorListingService: GetCreatorListingService) { }

    @Get('/creator')
    async getCreatorListing(@Req() req: Request, @Query('offset') offset?: number, @Query('limit') limit?: number) {
        return this.getCreatorListingService.getCreatorListing(req.user, offset, limit);
    }
}