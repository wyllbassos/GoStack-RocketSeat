import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import AppError from '@shared/errors/AppError';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import GoogleSMTPMailProvider from './MailProvider/implementations/GoogleSMTPMailProvider';

import IMailTemplateProvider from './MailTemplateProvieder/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvieder/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(GoogleSMTPMailProvider),
);
