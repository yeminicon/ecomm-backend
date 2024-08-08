/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';

describe('MailerController', () => {
  let mailerController: MailerController;
  let mailerService: MailService;

  const mockMailerService = {
    // Mock any methods from MailerService that you plan to use in your tests
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
      providers: [
        {
          provide: MailService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    mailerController = module.get<MailerController>(MailerController);
    mailerService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailerController).toBeDefined();
  });

  // Add more tests here as you implement methods in the controller
});
