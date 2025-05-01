import { Module } from '@nestjs/common';
import { NotificationPreferencesController } from './notification_preferences.controller';

@Module({
  controllers: [NotificationPreferencesController]
})
export class NotificationPreferencesModule {}
