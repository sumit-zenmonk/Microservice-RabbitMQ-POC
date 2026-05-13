import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailBoxStatusEnum } from 'src/domain/mailbox/mailbox.enum';
import { EmailService } from 'src/infrastructure/email/mail.service';
import { CreateMailEntryPayload, CreatorPostCreatedMailBody } from 'src/infrastructure/email/template/creator-post-to-follower/creator_post_to_follower.type';
import { MailBoxRepository } from 'src/infrastructure/repository/mailbox.repo';

@Injectable()
export class CreatorPostToFollowerCronService {
    constructor(
        private readonly mailBoxRepo: MailBoxRepository,
        private readonly emailService: EmailService,
    ) { }
    private readonly logger = new Logger(CreatorPostToFollowerCronService.name);

    // Runs every minute
    @Cron(CronExpression.EVERY_SECOND)
    async handleCron() {
        // fetch top 10 pending mail 
        const pendingmails = await this.mailBoxRepo.findTopTenPendingMails();
        for (const mail of pendingmails) {
            const mailbox_entry_detail: CreateMailEntryPayload = {
                email: mail.email,
                body: mail.body as CreatorPostCreatedMailBody
            }
            await this.emailService.sendCreatorPostNotificationToFollower(mailbox_entry_detail);
            await this.mailBoxRepo.updateStatus(mail.uuid, MailBoxStatusEnum.SENT);
        }
    }
}