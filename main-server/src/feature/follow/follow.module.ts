import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { CreateFollowerOfCreatorModule } from "./create-follower-of-creator/create-follower-of-creator.module";
import { GetFollowingListingModule } from "./get-following-listing/get-following-listing.module";
import { DeleteFollowerOfCreatorModule } from "./delete-follower-of-creator/delete-follower-of-creator.module";

@Module({
    imports: [
        CreateFollowerOfCreatorModule,
        GetFollowingListingModule,
        DeleteFollowerOfCreatorModule,
        RouterModule.register([
            {
                path: 'user',
                children: [
                    { path: '/creator', module: CreateFollowerOfCreatorModule },
                    { path: '/creator', module: GetFollowingListingModule },
                    { path: '/creator', module: DeleteFollowerOfCreatorModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})

export class FollowModule { }