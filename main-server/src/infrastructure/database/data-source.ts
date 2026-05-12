//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

//Entities
import { UserEntity } from "src/domain/user/user.entity";
import { PostEntity } from "src/domain/post/post.entity";
import { FollowEntity } from "src/domain/follow/follow.entity";

const options: DataSourceOptions = {
    type: process.env.DB_POSTGRES_TYPE as any,
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT as any,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    entities: [
        UserEntity, PostEntity, FollowEntity
    ],
    synchronize: false,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export { dataSource, options };