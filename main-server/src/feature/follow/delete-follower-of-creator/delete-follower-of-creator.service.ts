import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/user/user.entity";
import { FollowRepository } from "src/infrastructure/repository/follow.repo";

@Injectable()
export class DeleteFollowerOfCreatorService {
    constructor(
        private readonly followRepo: FollowRepository
    ) { }

    async deleteFollowerOfCreatorService(follow_uuid: string, user: UserEntity) {
        const isFollowBondExists = await this.followRepo.findByUuid(follow_uuid);
        if (!isFollowBondExists) {
            throw new BadRequestException("Follow Bond not found");
        }

        await this.followRepo.deleteFollowBond(follow_uuid);
        return {
            message: "Follow Bond deleted successfully"
        };
    }
}