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

    async sendCreatorPostNotification(user: UserEntity, post: any) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'New post from creator you follow',
            html: `
                <p>Hello ${user.name},</p>
                <p>A creator you follow created a new post.</p>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            `,
        });
    }
}
