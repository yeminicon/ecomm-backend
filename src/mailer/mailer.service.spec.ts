/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mailer.service';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

jest.mock('nodemailer');
jest.mock('fs');

describe('MailService', () => {
  let service: MailService;
  let configService: ConfigService;
  let transporterMock: nodemailer.Transporter;

  beforeEach(async () => {
    transporterMock = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
    } as any;

    (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case process.env.MailerHost:
                  return 'smtp.test.com';
                case process.env.Port:
                  return 587;
                case process.env.MailerForm:
                  return 'test@test.com';
                case process.env.MailerPass:
                  return 'password';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read the template correctly', () => {
    const templateName = 'testTemplate';
    const templateContent = '<h1>Test</h1>';
    (fs.readFileSync as jest.Mock).mockReturnValue(templateContent);

    const result = (service as any).readTemplate(templateName);

    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining(templateName + '.hbs'),
      'utf8',
    );
    expect(result).toBe(templateContent);
  });

  it('should send an email successfully', async () => {
    const to = 'recipient@test.com';
    const subject = 'Test Subject';
    const html = '<h1>Test</h1>';

    await service.sendMail(to, subject, html);

    expect(transporterMock.sendMail).toHaveBeenCalledWith({
      from: 'smtp.test.com',
      to,
      subject,
      html,
    });
    expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
  });

  it('should log and throw an error if email sending fails', async () => {
    const to = 'recipient@test.com';
    const subject = 'Test Subject';
    const html = '<h1>Test</h1>';
    const error = new Error('Failed to send email');

    (transporterMock.sendMail as jest.Mock).mockRejectedValueOnce(error);

    await expect(service.sendMail(to, subject, html)).rejects.toThrowError(
      `Failed to send email to ${to}: ${error}`,
    );
  });
});
