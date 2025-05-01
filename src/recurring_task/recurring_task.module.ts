import { Module } from '@nestjs/common';
import { RecurringTaskSettingsController } from './recurring_task.controller';
import { RecurringTaskSettingsService } from './recurring_task.service';

@Module({
  controllers: [RecurringTaskSettingsController],
  providers: [RecurringTaskSettingsService],
})
export class RecurringTaskSettingsModule {}
