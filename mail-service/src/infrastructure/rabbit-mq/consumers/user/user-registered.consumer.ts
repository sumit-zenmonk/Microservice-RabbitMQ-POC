import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EmailService } from 'src/infrastructure/email/mail.service';
import { ExchangeNameEnum, ExchangeTypeEnum, QueueEnum, RoutingKeyEnum } from '../../type-enum/rabbit-mq.enum';
import { RabbitMQService } from '../../rabbit-mq.service';
import { UserRepository } from 'src/infrastructure/repository/user.repo';

@Injectable()
export class UserRegisteredConsumer implements OnModuleInit {
    private readonly logger = new Logger(UserRegisteredConsumer.name);

    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly emailService: EmailService,
        private readonly userRepo: UserRepository,
    ) { }

    async onModuleInit() {
        console.log(this.rabbitMQService);
        await this.rabbitMQService.setupExchangeQueueAndBind(
            QueueEnum.USER_QUEUE,
            ExchangeNameEnum.USER_EXCHANGE,
            RoutingKeyEnum.USER_REGISTERED,
            ExchangeTypeEnum.TOPIC,
        );

        await this.rabbitMQService.consumeMessages(
            QueueEnum.USER_QUEUE,
            async (data) => {
                this.logger.log(`Processing registered user: ${data.email}`,);

                await this.userRepo.register(data);
                await this.emailService.sendUserWelcome(data);
            },
        );
    }
}