import { faker } from '@faker-js/faker';
import { dataSource, options } from './data-source';
import { UserEntity } from 'src/domain/user/user.entity';
import { BcryptService } from '../services/bcrypt.service';
import { UserRoleEnum } from 'src/domain/user/user.enum';

// hardcoded creators for all microservices
const creators = [
    { email: 'creator1@test.com', name: 'Creator 1' },
    { email: 'creator2@test.com', name: 'Creator 2' },
    { email: 'creator3@test.com', name: 'Creator 3' },
    { email: 'creator4@test.com', name: 'Creator 4' },
    { email: 'creator5@test.com', name: 'Creator 5' },
    { email: 'creator6@test.com', name: 'Creator 6' },
    { email: 'creator7@test.com', name: 'Creator 7' },
    { email: 'creator8@test.com', name: 'Creator 8' },
    { email: 'creator9@test.com', name: 'Creator 9' },
    { email: 'creator10@test.com', name: 'Creator 10' },
    { email: 'creator11@test.com', name: 'Creator 11' },
    { email: 'creator12@test.com', name: 'Creator 12' },
    { email: 'creator13@test.com', name: 'Creator 13' },
    { email: 'creator14@test.com', name: 'Creator 14' },
    { email: 'creator15@test.com', name: 'Creator 15' },
];

async function create() {
    dataSource.setOptions({
        ...options,
    });

    await dataSource.initialize();

    const bcryptService = new BcryptService();
    const hashedPassword = await bcryptService.hashPassword("123");

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars

        // use same creators across all services
        for (const creator of creators) {
            const user = await queryRunner.manager.save(UserEntity, {
                email: creator.email,// faker.internet.email(),
                password: hashedPassword,
                name: creator.name,// faker.person.fullName(),
                role: UserRoleEnum.CREATOR
            });

            console.log(user);
        }

        await queryRunner.commitTransaction();
        console.info('✅ Seeded successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('❌ Something went wrong:', error);
    } finally {
        await queryRunner.release();
    }
}

void create();