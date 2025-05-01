import { Test, TestingModule } from '@nestjs/testing';
import { RecurringTaskSettingsController } from './recurring_task.controller';

describe('RecurringTaskSettingsController', () => {
  let controller: RecurringTaskSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurringTaskSettingsController],
    }).compile();

    controller = module.get<RecurringTaskSettingsController>(
      RecurringTaskSettingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
