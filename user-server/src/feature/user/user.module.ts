import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { RabbitMQService } from "src/infrastructure/rabbit-mq/rabbit-mq.service";
import { GetCreatorListingModule } from "./get-creator-listing/get-creator-listing.module";

@Module({
    imports: [
        GetCreatorListingModule,
        RouterModule.register([
            {
                path: 'user',
                children: [
                    { path: '/', module: GetCreatorListingModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [RabbitMQService],
    exports: [UserModule],
})

export class UserModule { }