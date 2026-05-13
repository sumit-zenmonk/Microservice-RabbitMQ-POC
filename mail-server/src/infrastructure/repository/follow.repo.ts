import { Injectable } from "@nestjs/common";
import { FollowEntity } from "src/domain/follow/follow.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class FollowRepository extends Repository<FollowEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(FollowEntity, dataSource.createEntityManager());
    }

    async createFollowerBond(body: Partial<FollowEntity>) {
        const follow = this.create(body);
        return await this.save(follow);
    }

    async findByUuid(uuid: string) {
        return await this.findOne({
            where: {
                uuid: uuid
            },
            withDeleted: true
        });
    }

    async findByFollowingUuid(following_uuid: string) {
        return await this.find({
            where: {
                following_uuid: following_uuid
            },
            relations: {
                follower: true
            },
            select: {
                uuid: true,
                follower_uuid: true,
                following_uuid: true,
                follower: {
                    uuid: true,
                    email: true,
                    name: true
                }
            }
        });
    }

    async deleteFollowBond(uuid: string) {
        return await this.softDelete({ uuid });
    }
}
