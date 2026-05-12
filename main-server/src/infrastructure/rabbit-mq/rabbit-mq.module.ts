import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { UserRegisteredConsumer } from './consumers/user/user-registered.consumer';
import { UserRepository } from '../repository/user.repo';

@Module({
    imports: [],
    providers: [RabbitMQService, UserRegisteredConsumer, UserRepository],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }