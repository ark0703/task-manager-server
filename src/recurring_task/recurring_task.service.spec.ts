import { Test, TestingModule } from '@nestjs/testing';
import { RecurringTaskSettingsService } from './recurring_task.service';

describe('RecurringTaskSettingsService', () => {
  let service: RecurringTaskSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecurringTaskSettingsService],
    }).compile();

    service = module.get<RecurringTaskSettingsService>(
      RecurringTaskSettingsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
