import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from 'src/subscribers/entities/subscriber.entity';
import { Job } from 'src/jobs/entities/job.entity';

const formatNumber = (salary: number, plus?: number) => {
  if (plus) return new Intl.NumberFormat().format(salary + +plus);
  return new Intl.NumberFormat().format(salary);
};

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('APP_EMAIL'),
            pass: configService.get<string>('APP_PASSWORD'),
          },
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(
            { numberHelper: formatNumber },
            { inlineCssEnabled: true },
          ),
          options: {
            strict: true,
          },
        },
        preview: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Subscriber, Job]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
