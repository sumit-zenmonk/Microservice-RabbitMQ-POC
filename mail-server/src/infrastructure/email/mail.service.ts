import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/user/user.entity';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) { }

    async sendUserWelcome(user: UserEntity) {
        await this.mailerService.sendMail({
            to: user.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './welcome', // `.ejs` extension is appended automatically
            context: { // filling <%= %> brackets with content
                name: user.name,
            },
        });
    }
}
