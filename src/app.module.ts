import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { AuditLogController } from './audit_log/audit_log.controller';
import { AuditLogModule } from './audit_log/audit_log.module';
import { RecurringTaskSettingsModule } from './recurring_task/recurring_task.module';
import { NotificationPreferencesService } from './notification_preferences/notification_preferences.service';
import { NotificationPreferencesModule } from './notification_preferences/notification_preferences.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entities';
import { Task } from './task/task.entities';
import { Notification } from './notification/notification.entities';
import { AuditLog } from './audit_log/audit_log.entities';
import { NotificationPreference } from './notification_preferences/notification_preferences.entities';
import { RecurringTask } from './recurring_task/recurring_task.entities';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [
    AppController,
    TaskController,
    AuditLogController,
    UserController,
  ],
  providers: [
    AppService,
    NotificationService,
    NotificationPreferencesService,
    UserService,
  ],
  imports: [
    TaskModule,
    NotificationModule,
    AuditLogModule,
    RecurringTaskSettingsModule,
    NotificationPreferencesModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Task,
        Notification,
        AuditLog,
        NotificationPreference,
        RecurringTask,
      ],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
