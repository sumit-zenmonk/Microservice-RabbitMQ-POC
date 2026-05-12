import { faker } from '@faker-js/faker';
import { dataSource, options } from './data-source';
import { UserEntity } from 'src/domain/user/user.entity';
import { BcryptService } from '../services/bcrypt.service';
import { UserRoleEnum } from 'src/domain/user/user.enum';

// hardcoded creators for all microservices
const creators = [
    {
        id: 1,
        uuid: '11111111-1111-1111-1111-111111111111',
        email: 'creator1@gmail.com',
        name: 'Creator 1',
    },
    {
        id: 2,
        uuid: '22222222-2222-2222-2222-222222222222',
        email: 'creator2@gmail.com',
        name: 'Creator 2',
    },
    {
        id: 3,
        uuid: '33333333-3333-3333-3333-333333333333',
        email: 'creator3@gmail.com',
        name: 'Creator 3',
    },
    {
        id: 4,
        uuid: '44444444-4444-4444-4444-444444444444',
        email: 'creator4@gmail.com',
        name: 'Creator 4',
    },
    {
        id: 5,
        uuid: '55555555-5555-5555-5555-555555555555',
        email: 'creator5@gmail.com',
        name: 'Creator 5',
    },
    {
        id: 6,
        uuid: '66666666-6666-6666-6666-666666666666',
        email: 'creator6@gmail.com',
        name: 'Creator 6',
    },
    {
        id: 7,
        uuid: '77777777-7777-7777-7777-777777777777',
        email: 'creator7@gmail.com',
        name: 'Creator 7',
    },
    {
        id: 8,
        uuid: '88888888-8888-8888-8888-888888888888',
        email: 'creator8@gmail.com',
        name: 'Creator 8',
    },
    {
        id: 9,
        uuid: '99999999-9999-9999-9999-999999999999',
        email: 'creator9@gmail.com',
        name: 'Creator 9',
    },
    {
        id: 10,
        uuid: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        email: 'creator10@gmail.com',
        name: 'Creator 10',
    },
    {
        id: 11,
        uuid: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        email: 'creator11@gmail.com',
        name: 'Creator 11',
    },
    {
        id: 12,
        uuid: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        email: 'creator12@gmail.com',
        name: 'Creator 12',
    },
    {
        id: 13,
        uuid: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        email: 'creator13@gmail.com',
        name: 'Creator 13',
    },
    {
        id: 14,
        uuid: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        email: 'creator14@gmail.com',
        name: 'Creator 14',
    },
    {
        id: 15,
        uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
        email: 'creator15@gmail.com',
        name: 'Creator 15',
    },
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
                id: creator.id,
                uuid: creator.uuid,
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